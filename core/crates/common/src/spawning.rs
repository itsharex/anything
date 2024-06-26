use std::{
    future::Future,
    sync::{
        atomic::{AtomicUsize, Ordering},
        Arc,
    },
};
use tokio::runtime::{Builder, Runtime};
use tracing::error;

use crate::error::AnythingResult;

#[allow(unused)]
pub fn build_runtime() -> AnythingResult<Arc<Runtime>> {
    let raw_runtime = Builder::new_multi_thread()
        .thread_name_fn(|| {
            static ATOMIC_ID: AtomicUsize = AtomicUsize::new(0);
            let id = ATOMIC_ID.fetch_add(1, Ordering::SeqCst);
            format!("scheduler-{}", id)
        })
        .thread_stack_size(4 * 1024 * 1024)
        .enable_all()
        .build()
        .expect("Init Tokio runtime failed.");

    let arc_runtime = Arc::new(raw_runtime);

    Ok(arc_runtime)
}

#[cfg(not(debug_assertions))]
pub fn spawn_or_crash<F, C, Fut>(name: impl Into<String>, ctx: C, func: F)
where
    F: Fn(C) -> Fut + Send + Sync + 'static,
    Fut: Future<Output = anyhow::Result<()>> + Send + 'static,
    C: Send + Sync + 'static,
{
    let name = name.into();

    let _ = tokio::spawn(async move {
        match func(ctx).await {
            Ok(_) => unreachable!("func never returns"),
            Err(err) => error!("task {} failed: {:?}", name, err),
        }
        error!("task {} failed, aborting!", name);
        std::process::exit(1);
    });
}

#[cfg(debug_assertions)]
pub fn spawn_or_crash<F, C, Fut>(name: impl Into<String>, ctx: C, func: F)
where
    F: Fn(C) -> Fut + Send + Sync + 'static,
    Fut: Future<Output = anyhow::Result<()>> + Send + 'static,
    C: Send + Sync + 'static,
{
    let name = name.into();

    let _ = tokio::spawn(async move {
        match func(ctx).await {
            Ok(_) => unreachable!("func never returns"),
            Err(err) => error!("task {} failed: {:?}", name, err),
        }
        error!("task {} failed, aborting!", name);
    });
}

pub async fn join_parallel<T: Send + 'static>(
    futs: impl IntoIterator<Item = impl Future<Output = T> + Send + 'static>,
) -> Vec<T> {
    let tasks: Vec<_> = futs.into_iter().map(tokio::spawn).collect();
    // unwrap the Result because it is introduced by tokio::spawn()
    // and isn't something our caller can handle
    futures::future::join_all(tasks)
        .await
        .into_iter()
        .map(Result::unwrap)
        .collect()
}

pub async fn loop_with_timeout_or_message<M, F>(
    duration: std::time::Duration,
    mut rx: tokio::sync::mpsc::Receiver<M>,
    mut callback: F,
) -> Result<(), tokio::time::error::Elapsed>
where
    F: FnMut(M) -> bool,
    M: Clone + Sync,
{
    tokio::time::timeout(duration, async {
        loop {
            tokio::select! {
                _ = tokio::time::sleep(std::time::Duration::from_millis(500)) => {
                    // just for heartbeats
                }
                Some(message) = rx.recv() => {
                    if callback(message) {
                        continue;
                    } else {
                        tracing::debug!("Exiting loop");
                    }
                }
            }
        }
    })
    .await
}
