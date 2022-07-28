/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useCallback, useEffect} from 'react';
import update from 'immutability-helper';
import {Button} from '@mui/material';

import {Category} from '../../../types/categories';
import {CategoryItem} from './CategoryItem';

const style = {
  width: 400,
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

type Props = {
  categories: Category[];
  onUpdateCategories: (items: Category[]) => void;
};

const DndCategories = ({categories, onUpdateCategories}: Props) => {
  const [sortedCategories, setSortedCategories] = useState<Category[]>([]);
  const sortByPosition = (a: Category, b: Category) => a.position - b.position;

  useEffect(() => {
    setSortedCategories(categories.sort(sortByPosition));
  }, []);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number, item: any) => {
      setSortedCategories((prevCards: any) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
      );
    },
    [],
  );

  const renderCard = (card: Category, index: number) => (
    <CategoryItem
      key={card.id}
      index={index}
      id={card.id}
      text={card.name}
      moveCard={moveCard}
    />
  );

  return (
    <div style={style}>
      {sortedCategories.length > 0 &&
        sortedCategories.map((card: any, index) => renderCard(card, index))}
      <Button
        onClick={() => onUpdateCategories(sortedCategories)}
        variant="contained">
        Save
      </Button>
    </div>
  );
};

export default DndCategories;
