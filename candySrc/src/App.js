import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ScoreBoard from './components/ScoreBoard';

const width = 8;
const candyColors = [
  require('./images/blue-candy.png'),
  require('./images/orange-candy.png'),
  require('./images/purple-candy.png'),
  require('./images/red-candy.png'),
  require('./images/yellow-candy.png'),
  require('./images/green-candy.png'),
];
const blank = require('./images/blank.png');

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [firstSelectedSquare, setFirstSelectedSquare] = useState(null);
  const [secondSelectedSquare, setSecondSelectedSquare] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const [firstSelectedSquareIndex, setFirstSelectedSquareIndex] = useState(null);
  const [secondSelectedSquareIndex, setSecondSelectedSquareIndex] = useState(null);
  





  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank

        if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay((score) => score + 4)
            columnOfFour.forEach(square => currentColorArrangement[square] = blank)
            return true
        }
    }
}

const checkForRowOfFour = () => {
  for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScoreDisplay((score) => score + 4)
          rowOfFour.forEach(square => currentColorArrangement[square] = blank)
          return true
      }
  }
}

const checkForColumnOfThree = () => {
  for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScoreDisplay((score) => score + 3)
          columnOfThree.forEach(square => currentColorArrangement[square] = blank)
          return true
      }
  }
}

const checkForRowOfThree = () => {
  for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScoreDisplay((score) => score + 3)
          rowOfThree.forEach(square => currentColorArrangement[square] = blank)
          return true
      }
  }
}

const moveIntoSquareBelow = () => {
  for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === blank) {
          let randomNumber = Math.floor(Math.random() * candyColors.length)
          currentColorArrangement[i] = candyColors[randomNumber]
      }

      if ((currentColorArrangement[i + width]) === blank) {
          currentColorArrangement[i + width] = currentColorArrangement[i]
          currentColorArrangement[i] = blank
      }
  }
}

// const handleClick = (index) => {
//   if (firstSelectedSquare === null) {
//     setFirstSelectedSquare(index);
//     console.log(index);
//   } else if (secondSelectedSquare === null) {
//     setSecondSelectedSquare(index);
//     // Burada swapSquares fonksiyonunu çağırın
//     swapSquares();
//   }
// };





//   const swapSquares = () => {
//     if (firstSelectedSquare !== null && secondSelectedSquare !== null) {
//       const newColorArrangement = [...currentColorArrangement];
//       const temp = newColorArrangement[firstSelectedSquare];
//       newColorArrangement[firstSelectedSquare] = newColorArrangement[secondSelectedSquare];
//       newColorArrangement[secondSelectedSquare] = temp;
  
//       // Yeni renk düzenini kullanarak state'i güncelleyin.
//       setCurrentColorArrangement(newColorArrangement);
  
//       setFirstSelectedSquare(null);
//       setSecondSelectedSquare(null);
//     }
//   };

// Seçilen kutuyu günceller
const handleSquarePress = (index) => {
  if (selectedSquare === null) {
    // Eğer henüz bir kutu seçilmediyse, seçilen kutuyu güncelle
    setSelectedSquare(index);
  } else {
    // İki kutu seçilmişse, kutuları değiştir
    console.log("Hamle yapıldı: ", selectedSquare, " -> ", index);
    swapSquares(selectedSquare, index);
  }
};



const swapSquares = (selectedIndex, targetIndex) => {
  if (selectedIndex !== null && targetIndex !== null) {
    // Seçilen kutuların satır ve sütun numaralarını hesaplayın
    const selectedRow = Math.floor(selectedIndex / width);
    const selectedCol = selectedIndex % width;
    const targetRow = Math.floor(targetIndex / width);
    const targetCol = targetIndex % width;

    // İki kutunun arasındaki mesafeyi hesaplayın
    const rowDiff = Math.abs(selectedRow - targetRow);
    const colDiff = Math.abs(selectedCol - targetCol);

    // Sadece bir adım yanında veya üstünde olan hareketleri kabul edin
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      const updatedArrangement = [...currentColorArrangement];
      [updatedArrangement[selectedIndex], updatedArrangement[targetIndex]] = [
        updatedArrangement[targetIndex],
        updatedArrangement[selectedIndex],
      ];
      setCurrentColorArrangement(updatedArrangement);
      setSelectedSquare(null); // Seçili kutuyu sıfırla
    } else {
      // İşlem geçersizse, seçili kutuyu sıfırlayın
      setSelectedSquare(null);
    }
  }
};




  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
    console.log('ilk çalışma')
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [currentColorArrangement]);

 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {currentColorArrangement.map((candyColor, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSquarePress(index)}
            style={{ width: 50, height: 50 }}
          >
            <Image source={candyColor} style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>
        ))}
      </View>
      <ScoreBoard score={scoreDisplay} />
    </View>
  );
};

export default App;



