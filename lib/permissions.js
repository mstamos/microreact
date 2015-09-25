// check that the userId specified owns the documents
ownsDocument =   (userId, doc) => {
    return doc && doc.userId === userId;
}