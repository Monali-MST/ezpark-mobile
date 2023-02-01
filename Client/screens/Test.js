import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import axios from "axios";

const Test = props =>{
    const [users, setUsers] = useState([])

    useEffect(()=>{
        const fetchAllUsers = async () =>{
            try{
                const res = await axios.get("http://10.0.2.2:8800/user");
                setUsers(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllUsers();
    },[])

    return(
        <SafeAreaView>
            <View>
                <Text>This is test page</Text>
                {users.map((user) => (
                <View key={user.id}>
                    <Text>
                        {user.FirstName}
                    </Text>
                    <Text>
                        {user.LastName}
                    </Text>
                    <Text>
                        {user.AddFLine}
                    </Text>
                </View>
                    
                ))}

            </View>
        </SafeAreaView>
    );
}

export default Test;