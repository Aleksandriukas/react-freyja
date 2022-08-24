type FlexAlignType =
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline";

export type StyleProperties = {
    backgroundColor: string;
    color: string;
    borderStyle: "solid" | "dotted" | "dashed";
    borderColor: string;
    borderWidth: number;
    fontSize: number;
    width: number;
    height: number;
    justifyContent:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    alignItems: FlexAlignType;
};
