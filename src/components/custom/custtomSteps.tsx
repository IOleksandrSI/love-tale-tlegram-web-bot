import { StepsItem, StepsList, StepsRoot } from '../steps.tsx';
import { useEffect, useState } from 'react';

export interface ISteps {
  step: number;
  config: { title: string }[],
}

export default function Steps({
                                step,
                                config,
                              }: ISteps) {

  const [groups, setGroups] = useState<{ title: string }[][]>(chunkArray<{ title: string }>(config, 3));

  useEffect(() => {
    setGroups(chunkArray<{ title: string }>(config, 3));
  }, [config]);


  return (
    <StepsRoot  step={step} count={config.length}>
      {groups.map((group, rowIndex) => (
        <StepsList key={rowIndex}>
          {group.map((value, index) => <StepsItem index={rowIndex * 3 + index} title={`${rowIndex * 3 + index + 1}. ${value.title}`} />)}
        </StepsList>
      ))}
    </StepsRoot>
  );
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}