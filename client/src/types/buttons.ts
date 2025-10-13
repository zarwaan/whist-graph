export interface NavButton {
    name: string,
    pos: number,
    onclick: () => void
}

export interface NavButtonConfig {
    people: NavButton,
    media: NavButton
}