export class Post {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        title: string,
        content: string,
        userId: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
