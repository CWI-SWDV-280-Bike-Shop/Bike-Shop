import * as React from 'react';
import { Searchbar, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

export const Search_Bar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const theme = {
    MD3DarkTheme, // or MD3DarkTheme
    roundness: 0,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      tertiary: '#FFFFFF',
      onBackground: 'rgb(29, 27, 30)',
    },
  };

  return (
    <PaperProvider theme={theme}>
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            // iconColor="primary"
        />
    </PaperProvider>
    
  );
};

export default Search_Bar;