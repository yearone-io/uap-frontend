import React from "react";
import "./LightbulbLoader.css"; // Include the CSS for animation
import { Box, Flex } from "@chakra-ui/react";

const LightbulbLoader: React.FC = () => {
  return (
    <Flex
      flexDirection={"column"}
      gap={2}
      w={"100%"}
      height={"calc(100vh - 230px)"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <div className="lightbulb-loader">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="446"
          height="721"
          viewBox="0 0 446 721"
          fill="none"
          className="lightbulb-svg"
        >
          <path
            d="M4 228.823L85.3548 382.145L160.452 529.21L229.29 544.855L291.871 529.21L363.839 382.145L442.065 228.823L410.774 94.2742L298.129 3.53223H147.935L35.2903 94.2742L4 228.823Z"
            className="lightbulb-glow"
          />
          <path
            d="M229.29 632.468L151.064 610.564L147.935 616.823L169.839 635.597L166.71 660.629L185.484 676.274L179.226 688.79L201.129 707.564L229.29 716.952L257.452 707.564L276.226 688.79L269.968 676.274L285.613 660.629L279.355 635.597L304.387 616.823L301.258 610.564L229.29 632.468Z"
            className="lightbulb-glow"
          />
          <path
            d="M4 228.823L85.3548 382.145L160.452 529.21L229.29 544.855L291.871 529.21L363.839 382.145L442.065 228.823L410.774 94.2742L298.129 3.53223H147.935L35.2903 94.2742L4 228.823Z"
            stroke="#053241"
            strokeWidth="10"
          />
          <path
            d="M229.29 632.468L151.064 610.564L147.935 616.823L169.839 635.597L166.71 660.629L185.484 676.274L179.226 688.79L201.129 707.564L229.29 716.952L257.452 707.564L276.226 688.79L269.968 676.274L285.613 660.629L279.355 635.597L304.387 616.823L301.258 610.564L229.29 632.468Z"
            stroke="#053241"
            strokeWidth="10"
          />
        </svg>
      </div>
      <Box
        ml={4}
        fontSize="lg"
        fontFamily={"Tomorrow"}
        fontWeight="bold"
        className="lightbulb-glow"
        stroke="#053241"
      >
        Loading...
      </Box>
    </Flex>
  );
};

export default LightbulbLoader;
