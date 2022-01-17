import fs from 'node:fs/promises'
import path from 'node:path'
import { EOL } from 'node:os'

type Triplet = [number, number, number]

/**
 * Computes how many of the values in the array increase compared to the previous value
 * @param numbers An array of numbers to count the increases
 * @returns The number of increases
 */
function getIncreaseCount(numbers: number[]): number {
  if (numbers.length === 0) return 0

  let increaseCount = 0

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[i - 1]) increaseCount++;
  }

  return increaseCount
}

/**
 * Groups an array of numbers into triplets and returns the array of triplets. The function stops when there aren't enough items in the array to create a new triplet.
 * @example If array = [1, 2, 3, 4], the returned array of triples will be [[1, 2, 3], [2, 3, 4]]
 * @param array An array of numbers
 * @returns {Triplet} An array of triplets
 */
function groupArrayIntoTriplets(array: number[]): Triplet[] {
  if (array.length === 0) return []

  const triplets: Triplet[] = []
  for (let i = 0; i < array.length; i++) {
    const newTriplet: Array<number | undefined> = [array[i], array[i + 1], array[i + 2]]
    if (newTriplet.includes(undefined)) continue

    triplets.push(newTriplet as Triplet)
  }

  return triplets
}

const inputFileBuffer = await fs.readFile(path.resolve('day-1', 'input.in'))
const inputText = inputFileBuffer.toString()

const measurements: number[] = inputText.split(EOL).filter((s) => s !== '').map((s) => Number.parseInt(s, 10))

const measurementsIncreaseCount = getIncreaseCount(measurements)

console.log(`Initial measurements increase (part 1): ${measurementsIncreaseCount}`)

const triplets = groupArrayIntoTriplets(measurements)
const tripletsIncreaseCount = getIncreaseCount(triplets.map(([m1, m2, m3]) => m1 + m2 + m3))

console.log(`Three-measurement sliding windows increases (part 2): ${tripletsIncreaseCount}`)

