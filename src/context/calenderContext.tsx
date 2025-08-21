import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const CalendarContext = createContext<DateContextType | undefined>(undefined);

export const CalendarDateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useDate = (): DateContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};
