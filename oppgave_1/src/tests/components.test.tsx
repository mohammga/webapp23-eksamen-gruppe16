import React from "react"
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor
} from "@testing-library/react"

import Answer from "@/components/Answer"
import Button from "@/components/Button"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import useProgress from "@/hooks/useProgress"
import { Task } from "@/types"
import { useState, useEffect } from "react";


jest.mock('path-to-useProgress-hook', () => ({
  useProgress: jest.fn(() => ({ poeng: 0, setPoeng: jest.fn() })),
}));


describe("Button Component", () => {
  it("renders a button with children", () => {
    render(<Button classNames="custom-class">Click me</Button>)
    const button = screen.getByText("Click me")
    expect(button).toHaveClass("custom-class")
    expect(button).toBeInTheDocument()
  })

  it("applies custom classNames to the button", () => {
    render(<Button classNames={["class1", "class2"]}>Custom Button</Button>)
    const button = screen.getByText("Custom Button")
    expect(button).toHaveClass("class1")
    expect(button).toHaveClass("class2")
  })
})

describe("Progress Component", () => {
  const tasks: Task[] = [
    {
      id: "123",
      text: "Skriv resultatet av regneoperasjonen",
      data: "9|2",
      type: "add",
    },
    {
      id: "234",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "add",
    },
    {
      id: "356",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "multiply",
    },
  ]

  it("renders with default state and buttons", () => {
    render(<Tasks tasks={tasks} antallOppgaver={3}/>)

    const currentTask = screen.getByText(/123/i)
    expect(currentTask).toBeInTheDocument()

    const nextButton = screen.getByText(/Neste/i)
    expect(nextButton).toBeInTheDocument()
/** Vi har ikke forrige knapp
    const prevButton = screen.getByText("Forrige")
    expect(prevButton).toBeInTheDocument() */
  })

  /**
  it('increments the state when "Neste" is clicked', async () => {

    render(<Tasks tasks={tasks} antallOppgaver={3} buttonOverride={true}/>)
    const nextButton = screen.getByText(/Neste/i)

    fireEvent.click(nextButton)

    screen

    await waitFor(() => {
      const updatedTask = screen.getByText(/234/i)
      expect(updatedTask).toBeInTheDocument()
    });

  }) */

  /** Urelevant test Fordi "Forrige" knappen ikke eksisterer

  it('decrements the state when "Forrige" is clicked', () => {
    render(<Progress tasks={tasks} />)
    const nextButton = screen.getByText("Neste")
    const prevButton = screen.getByText("Forrige")

    fireEvent.click(nextButton)
    fireEvent.click(prevButton)

    const updatedTask = screen.getByText("123")
    expect(updatedTask).toBeInTheDocument()
  }) */

/**

 */
  it("renders the provided text", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toBeInTheDocument()
  })

  it("applies the correct CSS class", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toHaveClass("text-sm text-slate-400")
  })

  it("renders the header text correctly", () => {
    render(<Tasks tasks={tasks} antallOppgaver={3}/>)

    //render(<Header />)
    const headerElement = screen.getByText(/Oppgave 1/i)

    expect(headerElement).toBeInTheDocument()
  })

  it("updates the answer correctly", () => {
    render(<Answer />)
    const inputElement = screen.getByPlaceholderText("Sett svar her")

    fireEvent.input(inputElement, { target: { value: "11" } })

    expect(inputElement.value).toBe("11")
  })

  it('displays "Bra jobbet!" when the answer is correct', async () => {
    const tasks = [{ id: '1', question: '...', correctAnswer: '11' }, ...]; // Mock tasks
    render(<Tasks tasks={tasks} antallOppgaver={3}/>);
  
    const inputElement = screen.getByPlaceholderText("Sett svar her");
    const sendButton = screen.getByText(/Sjekk svar/i);
  
    fireEvent.input(inputElement, { target: { value: "11" } });
    fireEvent.click(sendButton);
  
    // Venter i 100ms før vi fortsetter
    await new Promise(resolve => setTimeout(resolve, 100));
  
    await waitFor(() => {
      const successMessage = screen.getByText(/Bra jobbet!/i);
      expect(successMessage).toBeInTheDocument();
    });
  });

  /* */
  
  /**it("renders a list of tasks correctly", () => {
    render(<Tasks tasks={tasks} antallOppgaver={3}/>);
  
    const firstTask = tasks[0];
  
    const taskElement = screen.getByText(new RegExp(firstTask.text.toString(), 'i'));
    const typeElement = screen.getByText(new RegExp(firstTask.type.toString(), 'i'));
    const dataElement = screen.getByText(new RegExp(firstTask.data.toString(), 'i'));
  
    expect(taskElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
    expect(dataElement).toBeInTheDocument();
  }); */
  

  /**

  it("initializes with count as 0 and returns the current task", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    console.log("HER ER RESULT: ")
    console.log(result)

    expect(result.current.count).toBe(0)
    expect(result.current.current).toEqual(tasks[0])
  }) */
  
  /**it("updates count when next is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.next()
    })

    expect(result.current.count).toBe(1)
    expect(result.current.current).toEqual(tasks[1])
  }) */

  /**
    Prev testen er ugyldig i vårt prosjekt
    it("updates count when prev is called", () => {
      const { result } = renderHook(() => useProgress({ tasks }))

      act(() => {
        result.current.prev()
      })

      expect(result.current.count).toBe(tasks.length - 1)
      expect(result.current.current).toEqual(tasks[tasks.length - 1])
    })
 */
})
