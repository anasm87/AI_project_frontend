import Head from "next/head";
import {
  Container,
  Heading,
  Button,
  FormControl,
  Input,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useFetch from "use-http";
export default function Home() {
  const [inputs, setInputs] = useState({
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Cat.jpeg"   
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const { get, loading, data } = useFetch(
    process.env.NEXT_PUBLIC_PREDICTION_API
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("\x1b[33m%s\x1b[0m", "%c >> event.", event);
    console.log("\x1b[33m%s\x1b[0m", "%c >> inputs", inputs);
    get(
      `/predict?imageURL=${inputs.imageURL}`
    );
  };
  return (
    <Container>
      <Head>
        <title>AI Project Frontend</title>
        <meta name="description" content="Frontend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading as="h1" marginBottom="5">Image Classifier based on ResNet32</Heading>
        <form onSubmit={onSubmit}>
          <FormControl id="imageURL" isRequired>
            <Input
              onChange={handleOnChange}
              type="url"
              step="any"
              value={inputs.imageURL}
            />
            <FormLabel fontWeight="bold">imageURL</FormLabel>
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            loadingText="Predicting..."
          >
            Get Prediction
          </Button>
        </form>

        <Box>Prediction result: {data ? data.prediction : "None"}</Box>
        <Box>probability : {data ? data.probability : "None"}</Box>
      </main>

      <footer></footer>
    </Container>
  );
}
