import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

// ... (Interfaces remain the same)

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=${page}&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100`
      );

      const newProducts: Product[] = response.data.object;
      setProducts([...products, ...newProducts]);
      setPage(page + 1);
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const styles = StyleSheet.create({
    itemContainer: {
        height:'100%',
        width:'50%',
        margin:5,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      marginBottom: 20,
      overflow: 'hidden',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    itemDetails: {
      flex: 1,
      padding: 5,
    },
    image: {
      width: '40%',
      height: '100%',
      resizeMode: 'contain',
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    itemDescription: {
      fontSize: 14,
      color: '#666666',
    },
  });
  

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.mediaUrl }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        {/* Display other product details */}
      </View>
    </TouchableOpacity>
  );
  
  

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        onEndReached={fetchData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        // Implement other pagination props as needed
      />
    </View>
  );
};




export default HomeScreen;
