import { MockNewFlows } from "@/types/flow";
import {
  FlowTemplate,
  FlowTemplateVersion,
  Profile,
} from "@/types/supabase.types";

export const FAKE_PROFILES: Profile[] = [
  {
    avatar_url:
      "https://fokcbrnvhnwnwwpiqkdc.supabase.co/storage/v1/object/public/mocks/dumbledore.jpeg",
    full_name: "Albus Percival Wulfric Brian Dumbledore",
    bio: "Headmaster of Hogwarts School of Witchcraft and Wizardry",
    public: true,

    id: "1",
    instagram: "albus_insta_magic",
    linkedin: null,
    github: "https://github.com/dumbledore",
    tiktok: "https://tiktok.com/@albus_tiktok_spells",
    twitter: "https://twitter.com/headmasterAlbus",
    updated_at: "2023-10-09",
    username: "dumbledore",
    website: "https://hogwarts.edu/faculty/dumbledore",
    youtube: "https://youtube.com/@DumbledoreMagicChannel",
  },
  {
    avatar_url:
      "https://fokcbrnvhnwnwwpiqkdc.supabase.co/storage/v1/object/public/mocks/harry.webp",
    full_name: "Harry James Potter",
    bio: "Student at Hogwarts School of Witchcraft and Wizardry",
    public: true,
    github: null,
    id: "2",
    instagram: "https://instagram.com/theboywholived_official",
    linkedin: "https://linkedin.com/in/harrypotter",
    tiktok: "https://tiktok.com/lightning_scar_tiktok",
    twitter: "http://twitter.com/real_harrypotter",
    updated_at: "2023-10-09",
    username: "harry",
    website: "https://hogwarts.edu/students/harrypotter",
    youtube: "http://youtube.com/PotterQuidditchPlays",
  },
  // {
  //   avatar_url: "https://fokcbrnvhnwnwwpiqkdc.supabase.co/storage/v1/object/public/mocks/harry.webp",
  //   full_name: "Hermione Jean Granger",
  //   github: null,
  //   bio: "Student at Hogwarts School of Witchcraft and Wizardry",
  //   public: true,
  //   id: "3",
  //   instagram: "smartwitch_hermione",
  //   linkedin: "hermione_professional",
  //   tiktok: null,
  //   twitter: "bookworm_hermione",
  //   updated_at: "2023-10-09",
  //   username: "hermione_g",
  //   website: "https://hogwarts.edu/students/hermionegranger",
  //   youtube: "HermioneStudyGuides"
  // },
  // {
  //   avatar_url: "https://hogwarts.edu/avatars/ron_weasley.jpg",
  //   full_name: "Ronald Bilius Weasley",
  //   bio: "Student at Hogwarts School of Witchcraft and Wizardry",
  //   github: null,
  //   id: "4",
  //   instagram: "weasleyisourking_ron",
  //   linkedin: null,
  //   tiktok: "ron_tiktok_chess",
  //   twitter: "ron_the_king",
  //   updated_at: "2023-10-09",
  //   username: "ron_weasley",
  //   website: "https://hogwarts.edu/students/ronweasley",
  //   youtube: "WeasleyJokes"
  // },
  // {
  //   avatar_url: "https://hogwarts.edu/avatars/draco_malfoy.jpg",
  //   full_name: "Draco Lucius Malfoy",
  //   github: null,
  //   id: "5",
  //   instagram: "pureblood_draco",
  //   linkedin: "draco_malfoy_enterprises",
  //   tiktok: null,
  //   twitter: "slytherin_prince",
  //   updated_at: "2023-10-09",
  //   username: "draco_m",
  //   website: "https://hogwarts.edu/students/dracomalfoy",
  //   youtube: "MalfoyManorTours"
  // }
];

export const FAKE_FLOW_VERSIONS: FlowTemplateVersion[] = [
  {
    anything_flow_template_version: "v1.0",
    commit_message: "Initial version",
    created_at: "2023-10-01T12:00:00Z",
    flow_template_id: "ft001",
    flow_template_json: JSON.stringify(MockNewFlows[0]),
    flow_template_version: "v1.0",
    flow_template_version_id: "ftv001",
    flow_template_version_name: "Send message on file change",
    published: true,
    publisher_id: "pub001",
    recommended_version: false,
  },
  {
    anything_flow_template_version: "v1.1",
    commit_message: "Bug fixes",
    created_at: "2023-10-05T14:00:00Z",
    flow_template_id: "ft001",
    flow_template_json: JSON.stringify(MockNewFlows[0]),
    flow_template_version: "v1.1",
    flow_template_version_id: "ftv002",
    flow_template_version_name: "Move Cursor during earthquake",
    published: true,
    publisher_id: "pub002",
    recommended_version: false,
  },
  {
    anything_flow_template_version: "v2.0",
    commit_message: "New features added",
    created_at: "2023-10-10T10:00:00Z",
    flow_template_id: "ft002",
    flow_template_json: JSON.stringify(MockNewFlows[0]),
    flow_template_version: "v2.0",
    flow_template_version_id: "ftv003",
    flow_template_version_name: "Derp Test AI Magic",
    published: false,
    publisher_id: "pub003",
    recommended_version: false,
  },
  {
    anything_flow_template_version: "v2.1",
    commit_message: null,
    created_at: "2023-10-12T10:00:00Z",
    flow_template_id: "ft002",
    flow_template_json: JSON.stringify(MockNewFlows[1]),
    flow_template_version: "v2.1",
    flow_template_version_id: "ftv004",
    flow_template_version_name: "Message Person for Thing",
    published: false,
    publisher_id: "pub004",
    recommended_version: false,
  },
  {
    anything_flow_template_version: "v3.0",
    commit_message: "Major overhaul",
    created_at: "2023-10-15T18:00:00Z",
    flow_template_id: "ft003",
    flow_template_json: JSON.stringify(MockNewFlows[1]),
    flow_template_version: "v3.0",
    flow_template_version_id: "ftv005",
    flow_template_version_name: "Do Stuff For Thing",
    published: true,
    publisher_id: "pub005",
    recommended_version: false,
  },
];

export const FAKE_FLOWS: FlowTemplate[] = [
  {
    anonymous_publish: true,
    created_at: "2023-10-07T12:34:56Z",
    flow_template_description: "This is a sample flow template for testing.",
    flow_template_id: "ft-001",
    flow_template_name: "Test Flow 1",
    published: true,
    publisher_id: "pub-123",
    slug: "test-flow-1",
  },
  {
    anonymous_publish: false,
    created_at: "2023-09-15T08:12:34Z",
    flow_template_description: "Another example of a flow template.",
    flow_template_id: "ft-002",
    flow_template_name: "Example Flow 2",
    published: false,
    publisher_id: "pub-456",
    slug: "example-flow-2",
  },
  {
    anonymous_publish: true,
    created_at: "2023-08-21T14:23:45Z",
    flow_template_description: null,
    flow_template_id: "ft-003",
    flow_template_name: "Sample Flow 3",
    published: true,
    publisher_id: "pub-789",
    slug: "derp",
  },
  {
    anonymous_publish: false,
    created_at: "2023-07-19T18:45:12Z",
    flow_template_description: "A demo flow template for showcasing purposes.",
    flow_template_id: "ft-004",
    flow_template_name: "Demo Flow 4",
    published: true,
    publisher_id: "pub-012",
    slug: "demo-flow-4",
  },
  {
    anonymous_publish: true,
    created_at: "2023-06-11T10:56:23Z",
    flow_template_description: "Final test flow template in the mock data set.",
    flow_template_id: "ft-005",
    flow_template_name: "test flow",
    published: false,
    publisher_id: "pub-345",
    slug: "final-test-flow",
  },
];
