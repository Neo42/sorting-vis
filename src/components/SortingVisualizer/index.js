import React, { useEffect, useState } from "react"
import { getMergeSortAnimations } from "../../sortingAlgorithms"
import {
	NUMBER_OF_ARRAY_BARS,
	ANIMATION_SPEED_MS,
	PRIMARY_GRADIENT,
	SECONDARY_GRADIENT,
	TERTIARY_GRADIENT
} from "../../constants"
import "./style.css"
import GitHubCorner from "../GithubCorner"
import { PlayIcon, RefreshIcon } from "../../icons"

const SortingVisualizer = () => {
	const [array, setArray] = useState([])
	const resetArray = () => {
		let newArray = [...Array(NUMBER_OF_ARRAY_BARS).keys()]
		newArray = newArray.map(() => randomIntFromInterval(5, 400))
		setArray(newArray)
		let arrayBars = document.querySelectorAll(".array-bar")
		arrayBars.forEach((thing) => {
			thing.style.background = SECONDARY_GRADIENT
			thing.style.backgroundAttachment = "fixed"
		})
	}

	const mergeSort = () => {
		const animations = getMergeSortAnimations(array)
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.querySelectorAll(".array-bar")
			const isColorChange = i % 3 !== 2
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i]
				const barOneStyle = arrayBars[barOneIdx].style
				const barTwoStyle = arrayBars[barTwoIdx].style
				const color = i % 3 === 0 ? TERTIARY_GRADIENT : PRIMARY_GRADIENT
				setTimeout(() => {
					barOneStyle.background = color
					barTwoStyle.background = color
					barOneStyle.backgroundAttachment = "fixed"
					barTwoStyle.backgroundAttachment = "fixed"
				}, i * ANIMATION_SPEED_MS)
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i]
					const barOneStyle = arrayBars[barOneIdx].style
					barOneStyle.height = `${newHeight}px`
				}, i * ANIMATION_SPEED_MS)
			}
		}
	}

	useEffect(resetArray, [])

	return (
		<>
			<GitHubCorner />
			<div id="array-container">
				{array.map((value, i) => (
					<div
						className="array-bar"
						key={i}
						style={{ height: value }}
					></div>
				))}
			</div>
			<div id="button-row">
				<button onClick={resetArray} id="new-array">
					<RefreshIcon id="icon" />
				</button>
				<button>Merge Sort</button>
				<button onClick={mergeSort}>
					<PlayIcon id="icon" />
				</button>
			</div>
		</>
	)
}

const randomIntFromInterval = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min)

export default SortingVisualizer
