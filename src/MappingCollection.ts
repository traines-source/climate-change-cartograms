export interface Label { [id: string]: string }
export interface Mapping {
    id: string;
    label: Label;
    x: number;
    y: number;
}
export interface MappingCollection { 
    [id: string]: {
        label: Label;
        mapping: Mapping[];
    }
};