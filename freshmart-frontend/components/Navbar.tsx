// components/Navbar.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "../redux/hooks";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;

  // Get cart items from Redux store
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigateToSearch = () => {
    if (searchText.trim()) {
      router.push({
        pathname: "/search",
        params: { query: searchText.trim() },
      });
      setSearchText("");
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarTop}>
        {/* Brand / Logo with big 🌿 icon */}
        <TouchableOpacity onPress={() => router.push("/")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.leafIcon}>🌿</Text>
            <Text style={styles.brand}>BluegrassMart</Text>
          </View>
        </TouchableOpacity>

        {!isMobile && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/featured")}>
              <Text style={styles.menuText}>Feature</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/products")}>
              <Text style={styles.menuText}>Products</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/categories")}>
              <Text style={styles.menuText}>Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/reviews")}>
              <Text style={styles.menuText}>Review</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/blogs")}>
              <Text style={styles.menuText}>Blogs</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.iconsContainer}>
          {/* Search Icon */}
          <TouchableOpacity
            onPress={() => setSearchOpen((prev) => !prev)}
            style={styles.iconButton}
          >
            <Text style={styles.icon}>🔍</Text>
          </TouchableOpacity>

          {/* Cart Icon with badge */}
          <TouchableOpacity
            onPress={() => router.push("/cart")}
            style={styles.iconButton}
          >
            <Text style={styles.icon}>🛒</Text>
            {totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalQuantity}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Account/User Icon */}
          <TouchableOpacity
            onPress={() => router.push("/account")}
            style={styles.iconButton}
          >
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>

          {/* Hamburger menu for mobile */}
          {isMobile && (
            <TouchableOpacity
              onPress={() => setMenuOpen((prev) => !prev)}
              style={styles.iconButton}
            >
              <Text style={styles.icon}>☰</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search input below navbar if open */}
      {searchOpen && (
        <View style={styles.searchContainer}>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search products..."
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={navigateToSearch}
            autoFocus
          />
          <TouchableOpacity onPress={navigateToSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Go</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.mobileMenuText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/featured")}>
            <Text style={styles.mobileMenuText}>Feature</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/products")}>
            <Text style={styles.mobileMenuText}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/categories")}>
            <Text style={styles.mobileMenuText}>Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/reviews")}>
            <Text style={styles.mobileMenuText}>Review</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/blogs")}>
            <Text style={styles.mobileMenuText}>Blogs</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  navbarTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leafIcon: {
    fontSize: 32,
    marginRight: 8,
    color: "#16a34a",
  },
  brand: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#16a34a",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  menuText: {
    color: "#16a34a",
    marginHorizontal: 12,
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  icon: {
    fontSize: 22,
    color: "#16a34a",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    height: 40,
    color: "#166534",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#166534",
    borderRadius: 6,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  mobileMenu: {
    marginTop: 10,
    backgroundColor: "#d1fae5",
    paddingVertical: 10,
    borderRadius: 6,
  },
  mobileMenuText: {
    color: "#166534",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default Navbar;
