interface Message{
    text: string;
    createdAt: Adamina.firestore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar:string;
    }
}