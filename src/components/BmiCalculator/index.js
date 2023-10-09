import {useState, useEffect} from 'react'

import {
  MainContainer,
  Title,
  BmiLevelsImage,
  CardContainer,
  MeasurementsContainer,
  MeasurementCard,
  Measurement,
  Unit,
  MeasurementValue,
  ButtonsContainer,
  Button,
  ResultContent,
  ResultText,
} from './styledComponents'

const getBmi = bmiData => {
  const {height, weight} = bmiData
  const heightInMeters = height / 100
  const bmi = weight / heightInMeters ** 2
  return bmi.toFixed(2)
}

const BmiCalculator = () => {
  const storedBMIData = JSON.parse(localStorage.getItem('bmiData'))

  const [bmiData, setBMIData] = useState({
    height: storedBMIData === null ? 170 : storedBMIData.height,
    weight: storedBMIData === null ? 60 : storedBMIData.weight,
  })
  useEffect(() => {
    document.title = `Your BMI: ${getBmi(bmiData)}`
  }, [bmiData])

  useEffect(() => {
    localStorage.setItem('bmiData', JSON.stringify(bmiData))
  }, [bmiData])

  const onIncrementWeight = () => {
    setBMIData(prevState => ({
      ...prevState,
      weight: prevState.weight + 1,
    }))
  }

  const onDecrementWeight = () => {
    setBMIData(prevState => ({
      ...prevState,
      weight: prevState.weight - 1,
    }))
  }

  const onIncrementHeight = () => {
    setBMIData(prevState => ({
      ...prevState,
      height: prevState.height + 1,
    }))
  }

  const onDecrementHeight = () => {
    setBMIData(prevState => ({
      ...prevState,
      height: prevState.height - 1,
    }))
  }

  return (
    <MainContainer>
      <Title>BMI CALCULATOR</Title>
      <BmiLevelsImage
        src="https://assets.ccbp.in/frontend/hooks/bmi-levels-img.png"
        alt="bmi levels"
      />
      <CardContainer>
        <MeasurementsContainer>
          <MeasurementCard>
            <Measurement>Height</Measurement>
            <MeasurementValue>
              {bmiData.height}
              <Unit>cms</Unit>
            </MeasurementValue>
            <ButtonsContainer>
              <Button onClick={onDecrementHeight}>-</Button>
              <Button onClick={onIncrementHeight}>+</Button>
            </ButtonsContainer>
          </MeasurementCard>
          <MeasurementCard>
            <Measurement>Weight</Measurement>
            <MeasurementValue>
              {bmiData.weight}
              <Unit>kgs</Unit>
            </MeasurementValue>
            <ButtonsContainer>
              <Button onClick={onDecrementWeight}>-</Button>
              <Button onClick={onIncrementWeight}>+</Button>
            </ButtonsContainer>
          </MeasurementCard>
        </MeasurementsContainer>
        <ResultContent>
          BMI: <ResultText>{getBmi(bmiData)}</ResultText>
        </ResultContent>
      </CardContainer>
    </MainContainer>
  )
}

export default BmiCalculator
