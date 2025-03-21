const contractAddress = "0xD2416469f0bb44F9066B1505d8d7F120759cB112";
const contractABI = [[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "courseName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "issueDate",
				"type": "string"
			}
		],
		"name": "CertificateIssued",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "certificates",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "courseName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issueDate",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isIssued",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "courseName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issueDate",
				"type": "string"
			}
		],
		"name": "issueCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "student",
				"type": "address"
			}
		],
		"name": "verifyCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];

let web3;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask!");
    }
});

async function issueCertificate() {
    const accounts = await web3.eth.getAccounts();
    const student = document.getElementById("studentAddress").value;
    const studentName = document.getElementById("studentName").value;
    const courseName = document.getElementById("courseName").value;
    const issueDate = document.getElementById("issueDate").value;

    await contract.methods.issueCertificate(student, studentName, courseName, issueDate)
        .send({ from: accounts[0] });

    alert("Certificate Issued!");
}

async function verifyCertificate() {
    const student = document.getElementById("verifyAddress").value;
    const result = await contract.methods.verifyCertificate(student).call();

    if (result[3]) {
        document.getElementById("certificateDetails").innerHTML = `
            <p>Student: ${result[0]}</p>
            <p>Course: ${result[1]}</p>
            <p>Issue Date: ${result[2]}</p>
        `;
    } else {
        document.getElementById("certificateDetails").innerHTML = `<p>No Certificate Found</p>`;
    }
}
