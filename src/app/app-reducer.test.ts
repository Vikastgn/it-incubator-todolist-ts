import {todolistId1} from "../features/TodolistsList/todolists-reducer";
import {appReducer, InitialStateType, setAppStatusAC, setAppErrorAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
        isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC({error: "some error"}))

    expect(endState.error).toBe("some error")

});

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC ({status: "loading"}))

    expect(endState.status).toBe("loading")

});
