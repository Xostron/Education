const handlers = require("../handlers")
// const jest = require("jest")

test("home page renders", () => {
  const req = {}
  const res = { render: jest.fn() }
  handlers.home(req, res)
  expect(res.render.mock.calls[0][0]).toBe("home")
})

test("play page renders", () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.play(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe("play")
    expect(res.render.mock.calls[0][1])
    .toEqual(expect.objectContaining({
        game:expect.stringMatching(/\w/),
    }))
  })

  test("404 page renders", () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.notFound(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe("404")
  })

  test("500 page renders", () => {
    const req = {}
    const res = { render: jest.fn() }
    const err = new Error('some error')
    const next = jest.fn()
    handlers.serverError(err,req, res,next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe("500")
  })