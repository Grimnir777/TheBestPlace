/*
 * XML Parser
 */

let logger = require('./logger.js').logger;

let defaultConfiguration = {
    compact : true,         // Display the XML on one line
    indent : 0,             // The indent step size (if the compact is disable)
    rootname : null,        // Add a root node
    arrayChildNameMap : {}  // A mapping for give a name for array item. Otherwise it will be the index
};

let default_root_value = 'root';
let default_array_item_value = 'value';

/* Parse a Javascript Object into a XML string
 * js   : The javascript Object
 * conf : An object that contain configuration (cf. documentation) 
 */
module.exports.js2xml = js2xml; // Export this function
function js2xml(js, conf){
    let xml = '<?xml version="1.0"?>';

    // Check for add a potential root
    let rootname = getConfAttribute(conf, 'rootname');
    if(rootname != null){
        js = addRootForNode(rootname, js);
    } else if(js instanceof Array){
        logger.debug('ADD DEFAULT ROOT : ' + default_root_value);
        js = addRootForNode(default_root_value, js);
    }

    if(getConfAttribute(conf, 'compact') == false) xml += '\n';

    xml += buildXMLObject(js, conf, 0);

    return xml;
}

/* Create a XML node based an Javascript Array
 * js           : The javascript Object
 * conf         : An object that contain configuration (cf. documentation) 
 * deep_lvl     : The index of the depth reach. Used when compact is disable to indent the current node
 * parent_key   : The name of the parent node. Use to math the child name if it's defined. Otherwise, it will use the word VALUE
 */
function buildXMLArray(js, conf, deep_lvl, parent_key){
    let xml = '';
    let indent = computeIndent(conf, deep_lvl);

    let node_name = getArrayChildName(conf, parent_key); if(node_name == null) { node_name = default_array_item_value; }

    js.forEach(function(obj){

        // Define if the the obj is a primitif type or not
        let is_primitif_obj = true;
        if(obj instanceof Object || obj instanceof Array)
            is_primitif_obj = false;

        // Draw the first tag (add the \n if we are NOT in compact mode AND if the type is not primitif -> draw on many line)
        xml += indent + '<' + node_name + '>'; if(getConfAttribute(conf, 'compact') == false && !is_primitif_obj) xml += '\n';
        
        // Draw the content of the node
        if(is_primitif_obj == false)
            xml += buildXMLObject(obj, conf, deep_lvl + 1);
        else
            xml += obj;
        
        // Add the indent if we are NOT in compact mode AND if the type is not primitif
        if(getConfAttribute(conf, 'compact') == false && !is_primitif_obj) xml += indent;

        // Add the close tag. Add a \n if we are NOT in compact mode
        xml += '</' + node_name + '>'; if(getConfAttribute(conf, 'compact') == false) xml += '\n';
    });

    return xml;
}

/* Create a XML node based an Javascript Object
 * js           : The javascript Object
 * conf         : An object that contain configuration (cf. documentation) 
 * deep_lvl     : The index of the depth reach. Used when compact is disable to indent the current node
 */
function buildXMLObject(js, conf, deep_lvl){
    let xml = '';
    let indent = computeIndent(conf, deep_lvl);

    for(let key in js){
        if(js[key] instanceof Array){

            xml += indent + '<' + key + '>'; if(getConfAttribute(conf, 'compact') == false) xml += '\n';
            xml += buildXMLArray(js[key], conf, deep_lvl + 1, key);
            xml += indent + '</' + key + '>'; if(getConfAttribute(conf, 'compact') == false) xml += '\n';

        } else if(js[key] instanceof Object){

            xml += indent + '<' + key + '>'; if(getConfAttribute(conf, 'compact') == false) xml += '\n';
            xml += buildXMLObject(js[key], conf, deep_lvl + 1);
            xml += indent + '</' + key + '>'; if(getConfAttribute(conf, 'compact') == false) xml += '\n';

        } else {

            xml += indent + '<' + key + '>' + js[key] + '</' + key + '>';
            if(getConfAttribute(conf, 'compact') == false) xml += '\n';

        }
    }
    return xml;
}

/* Compute the indent size base on the depth of the current node. 
 * conf     :  An object that contain configuration (cf. documentation). Use to check if compact is disable and get the indent size.
 * deep_lvl : The depth reach by the current node
 */
function computeIndent(conf, deep_lvl){
    let indent = '';
    if(getConfAttribute(conf, 'compact') == false){
        for(let i = 0; i < deep_lvl * getConfAttribute(conf, 'indent'); ++i){
            indent += ' ';
        }
    }
    return indent;
}

/* Get an attribute from the conf Object. If the user don't use a conf object, then we will get the default value into the defaultConfiguration Object
 * conf :  An object that contain configuration (cf. documentation). Use to check if compact is disable and get the indent size
 * attr : The attribute to get
 */
function getConfAttribute(conf, attr){
    if(conf != undefined && conf[attr] != undefined) return conf[attr];
    else return defaultConfiguration[attr];
}

/* Get the child name for a parent array node.
 * conf : An object that contain configuration (cf. documentation). Use to check if the map contains the parent
 * attr : The name of the parent node.
 */
function getArrayChildName(conf, attr){
    if(conf != undefined && conf['arrayChildNameMap'] != undefined) return conf['arrayChildNameMap'][attr];
    return null;
}

/* Add 
 *
 */
function addRootForNode(root_name, js){
    new_js = {};
    new_js[root_name] = js;
    return new_js;
}