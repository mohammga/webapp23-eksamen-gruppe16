import { fireEvent, render, screen } from "@testing-library/react"
import { getAthletes } from "../app/page"
import type { Athlete } from "@/types"
import { rest } from 'msw'
import { setupServer } from 'msw/node'

describe("Smoke test", () => {
  it("should work", () => {
    expect(true).toBe(true)
  })
})

const server = setupServer(
  rest.get('http://api/athlete', (req, res, ctx) => {
    console.log('MSW handler for /api/athlete called'); // Diagnostic log
    return res(ctx.json(fakeInfo));
  }),
);


const fakeInfo = {
  "success": true,
  "data": [
    {
        "userId": "pariatur-quos-aperio",
        "gender": "male",
        "sportType": "other"
    },
    {
        "userId": "cura-vado-amitto",
        "gender": "male",
        "sportType": "triathlon"
    },
    {
        "userId": "confugo-voco-fugiat",
        "gender": "female",
        "sportType": "running"
    }
  ]
}


describe("Get Athletes from Database", async () => {
  // Initialize MSW before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // Now we are testing the real functionality
  it("should fetch data", async () => {
    
    const athlete = await getAthletes();
    
    
    expect(athlete.data).not.toBe(null);
    expect(athlete.data).not.toBe(undefined);
  });

  /**
   * 
  it("should fetch data length not 0 bigger than 1", () => {
    //Returnerer alle athletes
    expect(verdi.data.length).not.toBe(0)
    expect(verdi.data.length).toBeGreaterThan(1)
  })
  it("should fetch userId", () => {
    //Returnerer alle athletes
    expect(verdi.data[0].userId).toBe("pariatur-quos-aperio")
  })
  it("should fetch gender", () => {
    //Returnerer alle athletes
    expect(verdi.data[0].userId).toBe("pariatur-quos-aperio")
  })
  it("should fetch sportType", () => {
    //Returnerer alle athletes
    expect(verdi.data[0].userId).toBe("pariatur-quos-aperio")
  })
  it("should fetch pariatur", () => {
    //Returnerer alle athletes
    expect(verdi.data[0].userId).toBe("pariatur-quos-aperio")
  })
   */
})