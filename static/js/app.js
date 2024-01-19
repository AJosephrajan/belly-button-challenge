// Assignment 14 - JavaScript Visualization - Belly Button Challenge
//******************************************************************* */
//Store the Source URL into a variable name url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// Promise pending for obtaining JSON data from URL
const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);
// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});

// Display the default plot
function init(){
    //create the dropdown list variable for all sample id's in the dataset by appending each ID as a new value
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then(function(data){
    let ids =data.names;
    console.log(ids);
        for (i of ids) {
             dropdownMenu.append("option").attr("value",i).text(i);
        };
    //store the first sample for display initialization
    let first_sample = ids[0];
    console.log(first_sample);
    // The init function call the graph functions with the first id(that is 940)
    showMetaData(first_sample);
    showBarChart(first_sample);
    showBubbleChart(first_sample);
    
    });
};

// Function for metadata, i.e., an individual's demographic information.
function showMetaData(sample){
    // Retrieve all all data using d3
    d3.json(url).then((data) => {
        // Acess all metadata
        let metaData = data.metadata;
        // Fliter metadata based on the value
        let value = metaData.filter(result =>result.id == sample);
        // // Log the array of metadata objects after the have been filtered
        // console.log(value);
        // Get the first first index value from the array
        let firstIndex = value[0];
        //Log the array of metadata objects after the have been filtered
        console.log(value);
        //clear the the meta data
        d3.select("#sample-metadata").text("");
        // Use Object.entries to add each key/value pair to the panel
        Object.entries(firstIndex).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
        });

    };  
    //  };
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
function showBarChart(sample){
    //Access the sample data for populating the bar chart
    d3.json(url).then((data)=>{
        let sampleData =data.samples;
        ///apply a filter that matches based on sample id
        let result = sampleData.filter(i =>i.id ==sample);
        //access and store the first entry in results filter
        firstResult = result[0];
        console.log(firstResult);
        //Store the first 10 results to display in the bar chart
        let sample_values = firstResult.sample_values.slice(0,10).reverse();
        // use reverse to find the top 10 otu_ids
        let otu_ids = firstResult.otu_ids.slice(0,10);
        let otu_labels = firstResult.otu_labels.slice(0,10).reverse();
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);
        //create the trace for bar chart
        let trace1 ={
            x:sample_values,
            y:otu_ids.map(item=>`OTU${item}`).reverse(),
            text : otu_labels,
            type:'bar',
            orientation :'h'
        };

        // Data trace array
        let data1 = [trace1];

        let layout = {title:"Top 10 OTUs"}
        Plotly.newPlot("bar", data1,layout);

        

    });

};
function showBubbleChart(sample){
    //Access the sample data for populating the bar chart
    d3.json(url).then((data)=>{
        let sampleData =data.samples;
        ///apply a filter that matches based on sample id
        let result = sampleData.filter(i =>i.id ==sample);
        //access and store the first entry in results filter
        firstResult = result[0];
        console.log(firstResult);
        //Store the first 10 results to display in the bar chart
        let sample_values = firstResult.sample_values;
        // use reverse to find the top 10 otu_ids
        let otu_ids = firstResult.otu_ids;
        let otu_labels = firstResult.otu_labels;
        //use console.log to see your data looks like at each step.
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);
        //create the trace for bar chart
        let trace2 ={
            x:otu_ids.reverse(),
            y:sample_values.reverse(),
            text : otu_labels.reverse(),
            mode:'markers',
            marker :{
                     size : sample_values,
                     color : otu_ids,
                     colorscale: "Earth"
                    }
        };

        // Data trace array
        let data2 = [trace2];

        let layout = {title:"Bacteria Count for each Sample ID",xaxis :{title:'OTU ID'},yaxis :{title: 'No Of Bacteria'}};
        Plotly.newPlot("bubble", data2,layout);

        

    });

};
//define the function when the dropdown detects a change (function name as defined in index.html)
function optionChanged(value){
    //log the values
    console.log(value);
    // showMetaData(value);
    showBarChart(value);
    showBubbleChart(value);
    showMetaData(value);
};
init();








