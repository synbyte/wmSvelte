import clientPromise from '../../lib/mongodb-client'

export async function post (request) {
    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('sveltekit-todos');
    const todo = JSON.parse(request.body); // “Walk the dog”
    const newTodo = await collection.insertOne(todo);
    
    return {
        status: 200,
        body: {
            newTodo
        }
    }
}

