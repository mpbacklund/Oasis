export interface GameMode {
    name: string;
    players: number;
}

export const gameModes: Record<string, GameMode> = {
    BANK: {
        name: "Bank",
        players: 8,
    },
}; 