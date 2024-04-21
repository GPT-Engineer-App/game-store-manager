import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, List, ListItem, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaShoppingCart } from "react-icons/fa";

const Index = () => {
  const [games, setGames] = useState([
    { id: 1, name: "The Witcher 3", price: 29.99 },
    { id: 2, name: "Cyberpunk 2077", price: 49.99 },
    { id: 3, name: "Minecraft", price: 19.99 },
  ]);
  const [newGameName, setNewGameName] = useState("");
  const [newGamePrice, setNewGamePrice] = useState("");
  const toast = useToast();

  const addGame = () => {
    if (!newGameName || !newGamePrice) {
      toast({
        title: "Error",
        description: "Please enter both name and price for the game",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newGame = {
      id: games.length + 1,
      name: newGameName,
      price: parseFloat(newGamePrice),
    };
    setGames([...games, newGame]);
    setNewGameName("");
    setNewGamePrice("");
    toast({
      title: "Game Added",
      description: `${newGame.name} has been added to the catalog.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteGame = (id) => {
    setGames(games.filter((game) => game.id !== id));
    toast({
      title: "Game Deleted",
      description: "The game has been removed from the catalog.",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  };

  const placeOrder = (game) => {
    toast({
      title: "Order Placed",
      description: `You have ordered ${game.name}.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md">
      <VStack spacing={4} align="stretch">
        <Heading>Game Store Management System</Heading>
        <Flex>
          <Input placeholder="Game name" value={newGameName} onChange={(e) => setNewGameName(e.target.value)} />
          <Input placeholder="Price" type="number" value={newGamePrice} onChange={(e) => setNewGamePrice(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addGame}>
            Add Game
          </Button>
        </Flex>
        <List spacing={3}>
          {games.map((game) => (
            <ListItem key={game.id} p={2} shadow="md" borderWidth="1px">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">
                  {game.name} - ${game.price.toFixed(2)}
                </Text>
                <Box>
                  <Button size="sm" leftIcon={<FaShoppingCart />} colorScheme="green" onClick={() => placeOrder(game)}>
                    Order
                  </Button>
                  <Button size="sm" leftIcon={<FaTrash />} colorScheme="red" onClick={() => deleteGame(game.id)}>
                    Delete
                  </Button>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
