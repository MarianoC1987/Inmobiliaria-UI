import React, { useState } from "react";
import Rule_Estates from "../../api/Rule_Estates";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Flex,
  InputLeftElement,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import swal from "sweetalert";

function DeleteEstate() {
  const [id, setId] = useState();
  const handleId = (e) => {
    setId(e.target.value);
  };

  const confirmDelete = () => {
    swal("Seguro que quieres borrar este inmueble?", {
      buttons: ["Si", "No"],
    })
      /* 
      //PROBANDO EL CATCH PORQUE NO AGARRA EL ERROR DE TIME OUT O SI NO ENCUENTRA EL SERVER
      .then(() => {
        deleteOneEstate();
      })
      .catch(() => {
        swal("Ha ocurrido un error", {
          icon: "error",
        });
      }); */
      .then((willNotDelete) => {
        if (!willNotDelete) {
          deleteOneEstate();
        }
      });

    const deleteOneEstate = async () => {
      await Rule_Estates.deleteDelete(id)
        .then((response) => {
          swal("El inmueble se ha borrado correctamente", {
            icon: "success",
          });
        })
        .catch((error) => {
          swal(error, {
            icon: "error",
          });
        });
    };
  };

  const deleteOneEstate = async () => {
    await Rule_Estates.deleteDelete(id)
      .then((response) => {
        alert("El inmueble se ha borrado correctamente");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Flex alignItems="center" justify="center" height="70vh">
      <InputGroup size="md" width="50%">
        <InputLeftElement
          pointerEvents="none"
          children={<DeleteIcon color="gray.300" />}
        />
        <Input onChange={handleId} placeholder="Escriba el ID" />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={confirmDelete}
            colorScheme="red"
            margin="0.5"
          >
            ELIMINAR
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default DeleteEstate;
