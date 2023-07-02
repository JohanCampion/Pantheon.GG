import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";

declare let require: any;
declare let ethereum: any;
const Web3 = require('web3');

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: any;
  // @ts-ignore
  private accounts: string[];
  public ready = false;
  // @ts-ignore
  public abi;

  contractAddress = '0x128382E6Da9f14A43246BC04394C1a1A75427bbA';

  public accountsObservable = new Subject<string[]>();
  ABI = require('./Tournament.json');

  constructor(private http: HttpClient) {
    this.bootstrapWeb3();
  }

  private async enableAccounts() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
      } catch (error) {
        // User denied account access...
      }
    }
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)

    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(new Web3(window.web3.currentProvider));
      console.log('web3 init');
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    }

    setInterval(this.refreshAccounts, 500);

    // check if privacy mode is activated and request access

    this.enableAccounts().then(() => {
      this.refreshAccounts();
    });

    this.abi = this.artifactsToContract();
  }

  public artifactsToContract() {
    if (this.web3) {
      const instance = new this.web3.eth.Contract(this.ABI, this.contractAddress);
      return instance;
    }
  }

  public test() {
    console.log(JSON.stringify(this.getAccount()));
    console.log('test');
    if (this.getAccount()) {
      let params = new HttpParams();
      // @ts-ignore
      params = params.append('publicAddress', this.getAccount());
      this.http.post('https://localhost:8555/api/users', {publicAddress: this.getAccount()?.toLowerCase()}).subscribe(value => console.log(value));
    }
  }

  public async sign(nonce: number) {
    const test = 554;
    const message = this.web3.utils.utf8ToHex(`Pantheon.GG nonce : ${nonce}`);
    const signature = await this.web3.eth.personal.sign(message, this.accounts[0]);
    return signature;
  }

  public getProvider() {
    return this.web3.currentProvider;
  }

  public getAccount() {
    if (!this.accounts) {
      console.log('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return null;
    }
    return this.accounts[0];
  }

  getHeroes(): Promise<any> {
    let addr = ["0xC3BA6ee8e7bdb07f6937dEE2943eD2a33f08Cdf5", "0xd82BD1A9B69aD9C8bAD1C0623F24b687F802BC2C"]
    const t = this.abi.methods.createTournament('test', 1688005903, 1688005903, addr, 2).send({from: this.accounts[0]});
    console.log(t);
    return t;
  }

  getMesTournois() {
    const t = this.abi.methods.getMesTournoisOrganise().call({from: this.accounts[0]});
    console.log(t[0]);
  }

  public refreshAccounts = () => {
    if (typeof window.web3 !== 'undefined') {
      this.web3.eth.getAccounts((err: any, accs: any) => {
        if (err != null) {
          console.warn('There was an error fetching your accounts.');
          return;
        }

        // Get the initial account balance so it can be displayed.
        if (accs.length === 0) {
          console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
          return;
        }

        if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
          console.log('Observed new accounts');

          this.accountsObservable.next(accs);
          this.accounts = accs;
        }

        this.ready = true;
      });
    }
  };
}
