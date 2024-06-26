import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import api from "../tauri_api/api";
import { useFlowNavigationContext } from "../context/FlowNavigationProvider";
import { useFlowContext } from "../context/FlowProvider";

const NodeConfigPanel = () => {
  const { nodeId } = useFlowNavigationContext();
  const { readNodeConfig, writeNodeConfig } = useFlowContext();

  const [data, setData] = useState<Node | undefined>();

  const skipKeys = ["trigger", "handles", "presentation", "mockData", "variables"];

  const nonEditableSubKeys = ["node_name"];

  const saveActionTemplate = async () => {
    try {
      if (!nodeId) return;

      //Get Node Configuration
      const res: any = await readNodeConfig(nodeId);

      console.log("res in saveTemplate", res);

      if (res === undefined) return;

      await api.flows.saveAction(res);
      // //set keys on form
      // Object.keys(res).forEach((key) => {
      //   setValue(key, res[key]);
      // });

      //set all data for display
      //TODO: save to the rust api
      // setData(res);
    } catch (error) {
      console.log("error", error);
    }
  }

  function snakeToCapitalized(input: string): string {
    return input
      .split('_') // Split the string by underscores
      .map((word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of each word
      )
      .join(' '); // Join the words with a space
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const hydrate = async () => {
    try {
      if (!nodeId) return;

      //Get Node Configuration
      const res: any = await readNodeConfig(nodeId);

      console.log("res in nodeConfig", res);

      if (res === undefined) return;

      //set keys on form
      Object.keys(res).forEach((key) => {
        setValue(key, res[key]);
      });

      //set all data for display
      setData(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const InputComponent = ({
    value,
    objectKey,
    index,
  }: {
    value: any;
    objectKey: string;
    index: number;
  }) => {
    console.log("Inputs: ", {
      value,
      objectKey,
      index,
    });
    if (typeof value === "string" || typeof value === "number") {
      return (
        <div key={objectKey + "internal"}>
          <div className="mb-1">{objectKey}:</div>
          <textarea
            disabled={nonEditableSubKeys.includes(objectKey)}
            className="textarea textarea-bordered textarea-md w-full"
            defaultValue={value}
            {...register(objectKey)}
            rows={Math.ceil(String(value).length / 40)} //make the size of text
          />
          {errors[objectKey] && (
            <span>{JSON.stringify(errors[objectKey]?.message)}</span>
          )}
        </div>
      );
    } else if (typeof value === "boolean") {
      return (
        <Controller
          key={index}
          name={objectKey}
          control={control}
          disabled={nonEditableSubKeys.includes(objectKey)}
          defaultValue={value}
          render={({ field }) => (
            <label>
              {objectKey}:
              <input
                className="toggle toggle-success"
                type="checkbox"
                {...field}
                checked={field.value}
              />
            </label>
          )}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  const onSubmit = (data: any) => {
    if (!nodeId) return;
    console.log("Submitting Node Config:");
    console.log(data);
    writeNodeConfig(nodeId, data);
  };

  return (
    <div className="flex flex-col hide-scrollbar max-h-screen overflow-y-auto p-4">
      <div className="mb-20">
        <h1 className="text-2xl font-bold">Node Settings</h1>
        {nodeId ? (
          <>
            <form
              className="flex flex-col gap-4 p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {data
                ? Object.keys(data).map((key, index) => {
                  const value = data[key];
                  // If its an object go one level deeper
                  if (typeof value === "object" && value !== null) {
                    // Skip certain keys we don't want visible
                    if (!skipKeys.includes(key)) {
                      return (
                        <div key={key + "top"}>
                          <div>
                            <div className="mb-1 text-xl text-white ">
                              {snakeToCapitalized(key)}:
                            </div>
                          </div>

                          {Object.keys(value).map((nestedKey, nestedIndex) => {
                            const nestedValue = value[nestedKey];
                            console.log("Input to InputComponent: ", {
                              nestedValue,
                              nestedKey,
                              nestedIndex,
                            });
                            return (
                              <InputComponent
                                key={nestedKey + "nested"}
                                objectKey={`${key}.${nestedKey}`}
                                value={nestedValue}
                                index={nestedIndex}
                              />
                            );
                          })}
                        </div>
                      );
                    }
                  } else {
                    // Skip keys we don't want to show
                    if (!skipKeys.includes(key)) {
                      return (
                        <InputComponent
                          objectKey={key}
                          value={value}
                          index={index}
                        />
                      );
                    }
                  }
                })
                : null}
              <button className="mt-2 btn btn-primary" type="submit">
                Save
              </button>
            </form>
            <button className="mt-2 btn btn-secondary ml-4" onClick={saveActionTemplate}>
              Save as Reusable Action
            </button>
          </>
        ) : (
          <div>Select a node to configure</div>
        )}
      </div>
    </div>
  );
};

export default NodeConfigPanel;
