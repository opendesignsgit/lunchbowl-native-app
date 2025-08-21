import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import MenuService from 'services/MyPlansApi/MenuService';
import {useAuth} from './AuthContext';
interface Child {
  id: string;
  name: string;
}

interface MenuContextType {
  childrenData: Child[];
  fetchChildren: (data: RequestData) => Promise<void>;
}

interface RequestData {
  _id: string | null;
  path: string;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({children}: {children: ReactNode}) => {
  const {userId} = useAuth();
  const [childrenData, setChildrenData] = useState<Child[]>([]);

  const fetchChildren = async (data: RequestData) => {
    try {
      const response = await MenuService.GetChildrends(data);
      console.log('📌 Full response:', response);

      if (response.success && response.data && response.data.children) {
        const formattedChildren = response.data.children.map((child: any) => ({
          id: child.id,
          name: `${child.firstName?.trim() || ''} ${
            child.lastName?.trim() || ''
          }`.trim(),
        }));

        console.log('📌 Formatted children:', formattedChildren);
        setChildrenData(formattedChildren);
      } else {
        console.error('No children data found or response was not successful.');
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChildren({
        _id: userId,
        path: 'get-saved-meals',
      });
    }
  }, [userId]);

  return (
    <MenuContext.Provider value={{childrenData, fetchChildren}}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
