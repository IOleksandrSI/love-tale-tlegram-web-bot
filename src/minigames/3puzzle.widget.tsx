import React, { useEffect, useState } from 'react';

import heart1 from "../../assets/heart_piece_1.jpg";
import heart2 from "../../assets/heart_piece_2.jpg";
import heart3 from "../../assets/heart_piece_3.jpg";
import heart4 from "../../assets/heart_piece_4.jpg";

// React DnD
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

export interface IPuzzleHeartGame {
  submit: () => Promise<void>;
}

// ---------------------- Типи даних ----------------------
type PuzzlePiece = {
  id: number;
  img: string;           // /images/heart_piece_?.jpg
  correctSlotId: number; // куди має лягти
};

type PuzzleSlot = {
  id: number;
  correctPieceId: number;
  occupiedBy?: number;   // який piece.id у цьому слоті
};

// ---------------------- Компонент “шматок” (Drag) ----------------------
interface PieceProps {
  piece: PuzzlePiece;
  isUsed: boolean;
}
const Piece: React.FC<PieceProps> = ({ piece, isUsed }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "HEART-PIECE",
    item: { id: piece.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isUsed) return null; // якщо шматок уже в слоті, не показуємо у списку збоку

  const style: React.CSSProperties = {
    width: 80,
    height: 80,
    margin: "6px 0",
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    objectFit: "contain",
  };

  return (
    <img
      ref={dragRef}
      src={piece.img}
      alt={`heart piece #${piece.id}`}
      style={style}
    />
  );
};

// ---------------------- Компонент “слот” (Drop) ----------------------
interface SlotProps {
  slot: PuzzleSlot;
  pieceImg?: string;
  onDropPiece: (pieceId: number, slotId: number) => void;
}
const Slot: React.FC<SlotProps> = ({ slot, pieceImg, onDropPiece }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "HEART-PIECE",
    drop: (item: { id: number }) => {
      onDropPiece(item.id, slot.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const isCorrect =
    slot.occupiedBy === slot.correctPieceId && slot.occupiedBy !== undefined;

  const style: React.CSSProperties = {
    width: 80,
    height: 80,
    border: "1px dashed #999",
    margin: 4,
    position: "relative",
    backgroundColor: isOver ? "#e0ffe0" : "#f9f9f9",
    outline: isCorrect ? "2px solid green" : "none",
  };

  return (
    <div ref={dropRef} style={style}>
      {/* Якщо тут лежить piece, малюємо зображення */}
      {pieceImg && (
        <img
          src={pieceImg}
          alt="slot occupant"
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            objectFit: "contain",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

// ---------------------- ГОЛОВНИЙ КОМПОНЕНТ ----------------------
export default function PuzzleHeartGame ({submit}: IPuzzleHeartGame){
  // Початкові 9 шматків (id=1..9)
  const [pieces] = useState<PuzzlePiece[]>(() => [
    { id: 1, img: heart1, correctSlotId: 1 },
    { id: 2, img: heart2, correctSlotId: 2 },
    { id: 3, img: heart3, correctSlotId: 3 },
    { id: 4, img: heart4, correctSlotId: 4 },
    { id: 5, img: heart1, correctSlotId: 5 },
    { id: 6, img: heart2, correctSlotId: 6 },
    { id: 7, img: heart3, correctSlotId: 7 },
    { id: 8, img: heart4, correctSlotId: 8 },
    { id: 9, img: heart1, correctSlotId: 9 },
  ]);

  const [isPuzzleComplete, setIsPuzzleComplete] = useState<boolean>(false);

  // Початкові 9 слотів (id=1..9)
  const [slots, setSlots] = useState<PuzzleSlot[]>(() => [
    { id: 1, correctPieceId: 1 },
    { id: 2, correctPieceId: 2 },
    { id: 3, correctPieceId: 3 },
    { id: 4, correctPieceId: 4 },
    { id: 5, correctPieceId: 5 },
    { id: 6, correctPieceId: 6 },
    { id: 7, correctPieceId: 7 },
    { id: 8, correctPieceId: 8 },
    { id: 9, correctPieceId: 9 },
  ]);

  useEffect(() => {
    setIsPuzzleComplete(slots.every(
      (s) => s.occupiedBy === s.correctPieceId
    ));
  }, [slots]);

  useEffect(() => {
    if (isPuzzleComplete) {
      (async () => {
        await submit();
      })();
    }
  }, [isPuzzleComplete]);

  // Коли drag&drop поклав pieceId у slotId
  const handleDropPiece = (pieceId: number, slotId: number) => {
    setSlots((prev) => {
      // знімаємо pieceId зі старого слота, якщо був
      const newSlots = prev.map((s) =>
        s.occupiedBy === pieceId ? { ...s, occupiedBy: undefined } : s
      );

      // шукаємо цільовий слот
      const idx = newSlots.findIndex((s) => s.id === slotId);
      if (idx < 0) return newSlots;

      // якщо цей слот зайнятий, у прикладі не витісняємо
      if (newSlots[idx].occupiedBy) {
        return newSlots;
      }

      newSlots[idx] = {
        ...newSlots[idx],
        occupiedBy: pieceId,
      };
      return newSlots;
    });
  };

  // Кнопка “Скинути” (повертаємо до початку)
  const handleReset = () => {
    setSlots((prev) =>
      prev.map((slot) => ({ ...slot, occupiedBy: undefined }))
    );
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div style={styles.wrapper}>
        <h2>Мінігра 3×3: “Серце з 9 частин”</h2>
        <p>
          Перетягніть кожен квадратик у відповідне місце, щоб зібрати
          цілісне серце.
        </p>
        <button style={styles.resetBtn} onClick={handleReset}>
          Скинути
        </button>

        <div style={styles.gameArea}>
          {/* Сітка 3×3 слотів */}
          <div style={styles.slotsContainer}>
            {slots.map((slot) => {
              const occupant = slot.occupiedBy;
              const occupantImg = occupant
                ? pieces.find((p) => p.id === occupant)?.img
                : undefined;
              return (
                <Slot
                  key={slot.id}
                  slot={slot}
                  onDropPiece={handleDropPiece}
                  pieceImg={occupantImg}
                />
              );
            })}
          </div>

          {/* Вільні шматки (які не лежать у слоті) */}
          <div style={styles.piecesContainer}>
            <h4>Доступні частини:</h4>
            {pieces.map((piece) => {
              const isUsed = slots.some((s) => s.occupiedBy === piece.id);
              return (
                <Piece
                  key={piece.id}
                  piece={piece}
                  isUsed={isUsed}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 16,
  },
  resetBtn: {
    padding: "6px 12px",
    backgroundColor: "#f33",
    border: "none",
    borderRadius: 4,
    color: "#fff",
    cursor: "pointer",
  },
  gameArea: {
    display: "flex",
    gap: 16,
    marginTop: 16,
  },
  slotsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gridTemplateRows: "repeat(3, 80px)",
    gap: 4,
  },
  piecesContainer: {
    minWidth: 120,
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: 8,
  },
  reward: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fffa",
    border: "2px solid #ccc",
    borderRadius: 8,
    display: "inline-block",
  },
};

