import fs from 'node:fs/promises'
import path from 'node:path'
import { EOL } from 'node:os'

type Direction = 'forward' | 'up' | 'down'
type Instruction = [Direction, number]

const inputFileBuffer = await fs.readFile(path.resolve('day-2', 'input.in'))
const inputText = inputFileBuffer.toString()

const inputLines = inputText.split(EOL).filter((s) => s !== undefined)

const instructions: Instruction[] = inputLines.map((line) => {
  const [direction, amountStr] = line.split(' ')

  return [direction as Direction, Number.parseInt(amountStr, 10)]
})

let depth = 0
let horizontalPosition = 0

for (const [dir, amount] of instructions) {
  switch (dir) {
    case 'forward':
      horizontalPosition += amount
      break;
    case 'down':
      depth += amount
      break
    case 'up':
      depth -= amount
      break
  }
}

let result = horizontalPosition * depth

console.log(`Part 1: horizontalPosition * depth = ${horizontalPosition} * ${depth} = ${result}`)

// Part 2 starts here

depth = 0
horizontalPosition = 0
let aim = 0

for (const [dir, amount] of instructions) {
  switch (dir) {
    case 'forward':
      horizontalPosition += amount
      depth += aim * amount
      break;
    case 'down':
      aim += amount
      break
    case 'up':
      aim -= amount
      break
  }
}

result = depth * horizontalPosition

console.log(`Part 2: horizontalPosition * depth = ${horizontalPosition} * ${depth} = ${result}`)