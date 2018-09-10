
export interface BubbleElement {
    name: string;
    size?: number;
    color?: string;
    children?: Array<BubbleElement>;
}

export interface Bubble {
    color?: string;
    data: BubbleElement;
}
