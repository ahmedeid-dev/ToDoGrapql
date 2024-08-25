import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql"
import { allUserNotesType, specificNoteType } from "./type.js"
import Note from "../../../database/model/note.model.js"

export const allUserNotes = {
    type: allUserNotesType,
    args: {
        userId: { type: GraphQLID }
    },
    resolve: async (parent, args) => {
        const notes = await Note.find({ user: args.userId })
        return notes
    }
}

export const specificNote = {
    type: allUserNotesType,
    args: {
        noteId: { type: GraphQLID },
        userId: { type: GraphQLID }
    },
    resolve: async (parent, args) => {
        const note = await Note.findOne({ _id: args.noteId, user: args.userId })
        return note
    }
}


export const addNote = {
    type: specificNoteType,
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
    },
    resolve: async (parent, args) => {
        const note = new Note({ title: args.title, description: args.description, user: args.userId })
        await note.save()
        return note
    }
}

export const updateNote = {
    type: specificNoteType,
    args: {
        noteId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
    },
    resolve: async (parent, args) => {
        const note = await Note.findOneAndUpdate({ _id: args.noteId }, { title: args.title, description: args.description, user: args.userId })
        await note.save()
        return note
    }
}

export const deleteNote = {
    type: GraphQLString,
    args: {
        noteId: { type: GraphQLID },
        userId: { type: GraphQLID }
    },
    resolve: async (parent, args) => {
        const note = await Note.findByIdAndDelete({ _id: args.noteId, user: args.userId })
        return "Note deleted successfully"
    }
}
