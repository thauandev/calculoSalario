import React, { Component } from "react";
import { calculateSalaryFrom } from "./lib/salary";

import Input from "./components/input/Input";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }

  handleSalary = (event) => {
    this.setState({
      fullSalary: event.target.value,
    });
  };

  results = (value, porcentage) => {
    return porcentage >= 0.01
      ? `${Intl.NumberFormat("br-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)} (${Intl.NumberFormat("br-BR").format(porcentage)}%)`
      : value;
  };

  render() {
    const { fullSalary } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);

    const inssPorcentage = (discountINSS / baseINSS) * 100;
    const irpfPorcentage = (discountIRPF / baseINSS) * 100;
    const netSalaryPorcentage = 100 - (inssPorcentage + irpfPorcentage);

    return (
      <>
        <div className="container">
          <div className="col">
            <h1>Meu Salário</h1>
            <label>Salário Bruto</label>
            <input
              type="number"
              defaultValue={fullSalary}
              onChange={this.handleSalary}
            ></input>
          </div>
          <Input
            value={Intl.NumberFormat("br-BR", {
              style: "currency",
              currency: "BRL",
            }).format(baseINSS)}
            id="Base INSS"
            label="Base INSS"
          />
          <Input
            value={this.results(discountINSS, inssPorcentage)}
            id="Desconto INSS"
            label="Desconto INSS"
          />
          <Input
            value={Intl.NumberFormat("br-BR", {
              style: "currency",
              currency: "BRL",
            }).format(baseIRPF)}
            id="Base IRPF"
            label="Base IRPF"
          />
          <Input
            value={this.results(discountIRPF, irpfPorcentage)}
            id="Desconto IRPF"
            label="Desconto IRPF"
          />
          <Input
            value={this.results(netSalary, netSalaryPorcentage)}
            id="Salário Liquido"
            label="Salário Liquido"
          />
        </div>
      </>
    );
  }
}
