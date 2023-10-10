import React from "react"
import { View, Text } from "react-native"


const ScoreBoard = ({ score }) => {
  return (
    <View >
      <Text>{score}</Text>
    </View>
  )
}

export default ScoreBoard