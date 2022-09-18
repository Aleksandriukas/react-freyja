type FlexAlignType =
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline";

export type StyleProperties = {
    // Common
    cursor: "pointer" | "none"; // FIXME does not exists on native
    // Color styles
    backgroundColor: string;
    color: string;
    // Border styles
    border: number;
    borderStyle: "solid" | "dotted" | "dashed";
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    // Font styles
    fontSize: number;
    // Container dimension (in pixels)
    width: number;
    minWidth: number;
    maxWidth: number;
    height: number;
    minHeight: number;
    maxHeight: number;
    // Flex box styles
    justifyContent:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    alignItems: FlexAlignType;
};
