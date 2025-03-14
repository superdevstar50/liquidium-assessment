import ordinals from "@/data/your_owned_ordinals.json";

export type Ordinal = (typeof ordinals.data)[number];
