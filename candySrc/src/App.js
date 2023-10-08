import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
// import { v4 as uuidv4 } from 'uuid'; // uuid kütüphanesini ekliyoruz



function randomColor() {
  const colors = ['red', 'pink', 'blue', 'yellow'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const App = () => {
  const [gridSize, setGridSize] = useState(5)
  const [grid, setGrid] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [matchedCounts, setMatchedCounts] = useState({
    red: 0,
    pink: 0,
    blue: 0,
    yellow: 0,
  });

  const createGrid = () => {
    const newGrid = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push({
          key: `${i}-${j}-${Math.random()}`,
          color: randomColor(),
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setSelectedBlock(null);
  };

  const toggleGridSize = (size) => {
    setGridSize(size);
    createGrid();

  };

  // const createGrid = () => {
  //   const newGrid = [];
  //   for (let i = 0; i < 5; i++) {
  //     const row = [];
  //     for (let j = 0; j < 5; j++) {
  //       row.push({
  //         key: `${i}-${j}-${Math.random()}`, // uuid ile benzersiz bir anahtar oluşturuyoruz
  //         color: randomColor(),
  //       });
  //     }
  //     newGrid.push(row);
  //   }
  //   setGrid(newGrid);
  //   setSelectedBlock(null);
  // };

  const toggleBlockSelection = (block) => {
    // Eğer tıklanan kutu zaten seçili ise, seçimden çıkar.
    if (selectedBlock && selectedBlock.key === block.key) {
      setSelectedBlock(null);
    } else if (!selectedBlock) {
      // İlk kutu seçiliyor.
      setSelectedBlock(block);
    } else {
      // İkinci kutu seçiliyor. Yer değiştirme işlemi yapılacak.
      const updatedGrid = [...grid];

      // Seçili kutuların indekslerini bul.
      const firstBlockIndex = selectedBlock.key.split('-').map(Number);
      const secondBlockIndex = block.key.split('-').map(Number);

      // İki kutunun rengini ve anahtarını değiştir.
      [updatedGrid[firstBlockIndex[0]][firstBlockIndex[1]].color, updatedGrid[secondBlockIndex[0]][secondBlockIndex[1]].color] = [updatedGrid[secondBlockIndex[0]][secondBlockIndex[1]].color, updatedGrid[firstBlockIndex[0]][firstBlockIndex[1]].color];
      [updatedGrid[firstBlockIndex[0]][firstBlockIndex[1]].key, updatedGrid[secondBlockIndex[0]][secondBlockIndex[1]].key] = [updatedGrid[secondBlockIndex[0]][secondBlockIndex[1]].key, updatedGrid[firstBlockIndex[0]][firstBlockIndex[1]].key];

      setGrid(updatedGrid);
      setSelectedBlock(null);
    }
  };

  const checkMatches = () => {
    const matchedBlocks = new Set();
  
    // Dikey ve yatay eşleşmeleri kontrol et
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[i] && grid[i][j]) { 
          let countVertical = 0;
          let countHorizontal = 0;
          let currentColor = grid[i][j].color;
  
          // Dikey eşleşmeleri kontrol et
          for (let k = i; k < 5; k++) {
            if (grid[k] && grid[k][j] && grid[k][j].color === currentColor) {
              countVertical++;
            } else {
              break;
            }
          }
  
          // Yatay eşleşmeleri kontrol et
          for (let k = j; k < 5; k++) {
            if (grid[i] && grid[i][k] && grid[i][k].color === currentColor) {
              countHorizontal++;
            } else {
              break;
            }
          }
  
          // En az 3 eşleşme varsa, kutuları eşleşenler listesine ekle.
          if (countVertical >= 3) {
            for (let k = i; k < i + countVertical; k++) {
              matchedBlocks.add(grid[k][j]);
            }
          }
  
          if (countHorizontal >= 3) {
            for (let k = j; k < j + countHorizontal; k++) {
              matchedBlocks.add(grid[i][k]);
            }
          }
        }
      }
    }
  
    // Eşleşen kutuları yerine yeni random renkli kutular ekleyin.
    if (matchedBlocks.size > 0) {
      const updatedGrid = [...grid];
      [...matchedBlocks].forEach((block) => {
        const [row, col] = block.key.split('-').map(Number);
        updatedGrid[row][col] = {
          key: block.key,
          color: randomColor(),
        };
      });
  
      // Konsola kaç kutu eşleştiğini yazdır
      console.log(`Eşleşen Kutu Sayısı: ${matchedBlocks.size}`);
  
      setGrid(updatedGrid);
  
      // Renk bazında eşleşme sayısını güncelle.
      const updatedCounts = { ...matchedCounts };
      [...matchedBlocks].forEach((block) => {
        updatedCounts[block.color]++;
      });
      setMatchedCounts(updatedCounts);
    }
  };
  

  // Her adımda eşleşmeleri kontrol et
  useEffect(() => {
    checkMatches();
  }, [grid]);

  useEffect(() => {
    createGrid();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Müzik" onPress={() => playMusic()} />

      <Button title="3x3 Tablo" onPress={() => toggleGridSize(3)} />
      <Button title="5x5 Tablo" onPress={() => toggleGridSize(5)} />
      {/* <Text style={styles.matchedText}>Eşleşen Kutu Sayısı:</Text>
      {Object.keys(matchedCounts).map((color) => (
        <Text key={color} style={styles.matchedText}>
          {color}: {matchedCounts[color]}
        </Text>
      ))} */}
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((block) => (
              <TouchableOpacity
                key={block.key} // Anahtar olarak benzersiz bir anahtar kullanıldı
                style={[
                  styles.box,
                  { backgroundColor: block.color },
                ]}
                onPress={() => toggleBlockSelection(block)}
              >
                <Text style={styles.boxText}>a</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: 50,
    height: 50,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  matchedText: {
    fontWeight: 'bold',
  },
});

export default App;
