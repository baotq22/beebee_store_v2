import { render } from "react-dom";
import Header from "../components/Header";
import '@testing-library/jest-dom'

test('demo', () => {
    expect(true).toBe(true)
})

test("Render to main page", () => {
    render(<Header />)
    expect(true).toBeTruthy()
})