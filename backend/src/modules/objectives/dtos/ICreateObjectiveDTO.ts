export default interface ICreateObjectiveDTO {
    title: string;
    goal: number;
    time?: number;
    isDaily: boolean;
    notifications?: Date[];
}
