import { View, Text , FlatList,ActivityIndicator,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React, { useState,useEffect } from 'react'
import { db } from '../../configs/FirebaseConfig'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore'; // Firebase Firestore methods

export default function CartList() {

  const [products,setProducts]=useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'MartProducts')); // Get documents from 'martproducts' collection
        const productsList = querySnapshot.docs.map(doc => doc.data()); // Map data to array
        setProducts(productsList); // Set products data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };
    fetchProducts();
    },[]);

    // Render cart items as a list
  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
       <Image source={{uri:item.imageUrl}} style={styles.productImage}/>
        <View style={styles.productDetails}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
        {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Services / Products</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show loading spinner if data is being fetched
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()} // Key for each item
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'outfit2',
  },
  productDetails: {
    flexDirection: 'column', // Stack name, price, and button vertically
    justifyContent: 'center', // Center content vertically
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row', // Row direction to align image and product details horizontally
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  productName: {
    fontSize: 20,
    fontFamily: 'outfit1',
  },
  productPrice: {
    fontSize: 18,
    color: 'green',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 15,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Things to do