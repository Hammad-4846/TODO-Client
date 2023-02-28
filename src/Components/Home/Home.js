import React, { useState, useEffect, useRef } from "react";
import { axiosClient } from "../../utils/axios";
import Dashboard from "../Dashboard/Dashboard";
import Search from "../Search/Search";
import * as d3 from "d3";

import "./Home.scss";

function Home() {
  const svgRef = useRef();
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await axiosClient.get("/me");
      console.log(response);
      if (response.status === 200 || response.statusText === "OK") {
        setNotes(response.data.result.user.tasks);
      }
    };
    getData();
  }, []);

  const filteredTodos = notes.filter((todo) => {
    if (!selectedMonth && !selectedYear) {
      // No filter selected
      return true;
    }
    if (!selectedMonth && selectedYear) {
      // Filter by year only
      console.log(todo.date.slice(0, 3), selectedYear);
      return todo.date.slice(0, 4) === selectedYear;
    }
    if (selectedMonth && !selectedYear) {
      // Filter by month only
      return todo.date.slice(5, 7) == Number(selectedMonth) + 1;
    }
    // Filter by month and year
    return (
      todo.date.slice(5, 7) == Number(selectedMonth) + 1 &&
      todo.date.slice(0, 4) === selectedYear
    );
  });
  console.log(notes[0]);

  const handleAddNote = async (note) => {
    const response = await axiosClient.post("/newtask", note);
    if (response.status === 200 || response.statusText === "OK") {
      const updatedTask = response.data.result.tasks;
      setNotes(updatedTask);
    }
  };

  const handleDeleteNote = async (taskId) => {
    const response = await axiosClient.post("removetask", { taskId });
    console.log(response);
    if (response.status === 200 || response.statusText === "OK") {
      const updatedTask = response.data.result.tasks;
      setNotes(updatedTask);
    }
  };

  const handleDragTodos = async (e, id) => {
    const draggedTodoId = e.dataTransfer.getData("text/plain");
    const updatedTodos = notes.filter((todo) => todo._id !== draggedTodoId);
    const draggedTodo = notes.find((todo) => todo._id === draggedTodoId);
    const dropIndex = notes.findIndex((todo) => todo._id === id);
    updatedTodos.splice(dropIndex, 0, draggedTodo);
    const response = await axiosClient.put("/dragtask", {
      newTodo: updatedTodos,
    });
    if (response.status === 200 || response.statusText === "OK") {
      setNotes(updatedTodos);
    }
  };

  // Use D3 to create a visualization of the todo list
  useEffect(() => {
    if (notes.length === 0) return;

    const data = d3.rollups(
      notes,
      (v) => v.length,
      (d) => d3.timeDay(d.date)
    );

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(([date]) => date));

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, ([, count]) => count)]);

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", ([date]) => x(date))
      .attr("y", ([, count]) => y(count))
      .attr("width", x.bandwidth())
      .attr("height", ([, count]) => height - y(count));

    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    chart.append("g").attr("class", "y-axis").call(d3.axisLeft(y));
  }, [notes]);

  
  // useEffect(() => {
  //   const svg = d3.select(svgRef.current);

  //   // Get unique dates from todos
  //   const dates = todos.reduce((acc, todo) => {
  //     const dateStr = todo.dateAdded.toISOString().slice(0, 10);
  //     if (!acc.includes(dateStr)) {
  //       acc.push(dateStr);
  //     }
  //     return acc;
  //   }, []);

  //   // Count todos for each date
  //   const data = dates.map((date) => {
  //     const count = todos.filter(
  //       (todo) => todo.dateAdded.toISOString().slice(0, 10) === date
  //     ).length;
  //     return { date, count };
  //   });

  //   // Set up scales
  //   const xScale = d3
  //     .scaleBand()
  //     .domain(dates)
  //     .range([0, 500])
  //     .padding(0.1);
  //   const yScale = d3
  //     .scaleLinear()
  //     .domain([0, d3.max(data, (d) => d.count)])
  //     .range([300, 0]);

  //   // Draw bars
  //   svg
  //     .selectAll(".bar")
  //     .data(data)
  //     .join("rect")
  //     .attr("class", "bar")
  //     .attr("x", (d) => xScale(d.date))
  //     .attr("y", (d) => yScale(d.count))
  //     .attr("width", xScale.bandwidth())
  //     .attr("height", (d) => 300 - yScale(d.count));

  //   // Add x-axis
  //   svg
  //     .append("g")
  //     .attr("transform", "translate(0,300)")
  //     .call(d3.axisBottom(xScale));

  //   // Add y-axis
  //   svg.append("g").call(d3.axisLeft(yScale));
  // }, [todos]);

  return (
    <div className="Home container">
      <Search handleSearchNote={setSearchText} />
      <div className="filter">
        <label>
          Select Month:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            {/* ...and so on for other months... */}
          </select>
        </label>
        <label>
          Select Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            {/* ...and so on for other years... */}
          </select>
        </label>
      </div>
      <svg ref={svgRef} className  = "Chart" />
      <Dashboard
        notes={filteredTodos.filter((note) =>
          note.note.toLowerCase().includes(searchText.toLowerCase())
        )}
        addNote={handleAddNote}
        deleteNote={handleDeleteNote}
        dragTodos={handleDragTodos}
      />
    </div>
  );
}

export default Home;
