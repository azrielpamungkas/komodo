"use server";
// lib/data/connectMetaMask.js
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { ContractRunner, ethers } from "ethers";
import { revalidatePath, unstable_noStore } from "next/cache";
import { deployedAddress } from "./utils";

// export async function connectToMetaMask() {
//   // Check if MetaMask is installed
//   if (typeof window !== "undefined") {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []).then(async () => {});
//         const signer = await provider.getSigner();
//         const contract = new ethers.Contract(CONTRACT, abi.abi, signer);
//         return contract;
//       } catch (error) {
//         alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
//       }
//     } else {
//       alert("MetaMask not installed");
//     }
//   }
// }

// export async function fetchCanditates() {
//   // const contract = await connectToMetaMask();
//   if (contract) {
//     const candidatesList = await contract.getAllCandidates();
//     const formattedCandidates = candidatesList.map((candidate, index) => {
//       return {
//         index: index,
//         name: candidate.name,
//         img: candidate.image,
//         voteCount: ethers.toNumber(candidate.voteCount),
//       };
//     });
//     return formattedCandidates;
//   }
// }

export async function fetchVoters() {
  unstable_noStore();

  // const contract = await connectToMetaMask();
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(deployedAddress, abi.abi, signer);

  if (contract) {
    try {
      const voters = await contract.fetchVoters();
      const votersFormatted = voters.map((voter, index) => {
        return {
          index: index,
          id: voter[0],
          name: voter[1],
          idCard: voter[2],
          isVerified: true ? voter[3] === "Verified" : false,
          isRegistered: true ? voter[4] === "Registered" : false,
          // isRegistered: voter[3],
          // account: voter[4],
        };
      });
      return votersFormatted;
    } catch (error) {
      return { message: `error: ${error}` };
    }
  }
}

export async function fetchVotersById(id: string) {
  unstable_noStore();

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(deployedAddress, abi.abi, signer);

  if (contract) {
    try {
      const voter = await contract.getVoterById(id);

      return {
        id: voter[0],
        name: voter[1],
        idCard: voter[2],
        isVerified: true ? voter[3] === "Verified" : false,
        isRegistered: true ? voter[4] === "Registered" : false,
        // isRegistered: voter[3],
        // account: voter[4],
      };
    } catch (error) {
      return { message: `error: ${error}` };
    }
  }
}

export async function deleteVoterById(id: string) {
  // const contract = await connectToMetaMask();
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(deployedAddress, abi.abi, signer);

  if (contract) {
    try {
      const voters = await contract.deleteVoterById(id);
      voters.wait();
    } catch (error) {
      return { message: `error: ${error}` };
    }
  }
  revalidatePath("/dashboard/voter");
}

export async function verifyVoterById(id: string) {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(deployedAddress, abi.abi, signer);
  if (contract) {
    try {
      console.log("disini");
      const voters = await contract.verifyVoter(id);
      voters.wait();
    } catch (error) {
      return { message: `error: ${error}` };
    }
  }
  revalidatePath("/dashboard/voter");
}

export async function fetchRemainingTime() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(deployedAddress, abi.abi, signer);
  if (contract) {
    try {
      console.log("terpanggil time");

      const tx = await contract.getRemainingTime();
      return tx;
    } catch (error) {
      console.log(`failed to register: ${error.message}`);
    }
  }
  // console.log(voterAddress);
  // revalidatePath("/dasboard/voter");
  // redirect("/validate/status");
}

export async function updateRemainingTime(minute: number) {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(deployedAddress, abi.abi, signer);

  if (contract) {
    const tx = await contract.modifyRemainingTime(minute);
    await tx.wait();
    // console.log(`receipt: ${tx}`);
  }
}

// export async function pushCanditate(signer: ContractRunner) {
//   const contract = await connectToMetaMask();
//   if (contract) {
//     const tx = await contract.addCandidate("Jack", "gambar-jack");
//     const receipt = await tx.wait();
//     // console.log(`receipt: ${receipt}`);
//   }
// }
