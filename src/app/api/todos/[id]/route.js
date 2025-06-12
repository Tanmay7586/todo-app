import admin from '@/lib/firebaseAdmin';

export async function PUT(request, { params }) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  const { id } = params;
  
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    const taskRef = admin.firestore().collection('todos').doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists || taskDoc.data().userId !== userId) {
      return Response.json({ error: 'Task not found' }, { status: 404 });
    }

    const updates = {
      ...await request.json(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await taskRef.update(updates);
    return Response.json({ id, ...updates });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  const { id } = params;
  
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    const taskRef = admin.firestore().collection('todos').doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists || taskDoc.data().userId !== userId) {
      return Response.json({ error: 'Task not found' }, { status: 404 });
    }

    await taskRef.delete();
    return Response.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}