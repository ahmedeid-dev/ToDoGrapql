import { addNote, allUserNotes, deleteNote, specificNote, updateNote } from "./api.js";
import { GraphQLObjectType, GraphQLSchema } from "graphql";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',

    fields: () => ({
        allUserNotes,
        specificNote
    }),
})

const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',

    fields: () => ({
        addNote,
        updateNote,
        deleteNote
    })
})

export const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: rootMutation
})

