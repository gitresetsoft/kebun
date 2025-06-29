import supabase from "./supabaseClient";

export const createRecord = async <T>(tableName: string, data: T) => {
  try {
    const { data: createdRecord, error } = await supabase
      .from(tableName)
      .insert(data)
      .single();
    if (error) throw error;
    return createdRecord;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

export const findAllRecords = async (tableName: string) => {
  try {
    const { data: records, error } = await supabase
      .from(tableName)
      .select('*');
    if (error) throw error;
    return records;
  } catch (error) {
    console.error('Error finding records:', error);
    throw error;
  }
};

export const readKebun = async (id: string) => {
  try {
    const kebunResponse = await supabase
      .from('mykebun_kebun')
      .select('*')
      .eq('id', id)
      .single();
    const plantsResponse = await supabase
      .from('mykebun_plant')
      .select('*')
      .eq('kebun_id', id);
    const membersResponse = await supabase
      .from('mykebun_member')
      .select('*')
      .eq('kebun_id', id);

    if (kebunResponse.error || plantsResponse.error || membersResponse.error) {
      throw new Error('Error reading kebun data');
    }

    return {
      kebun: kebunResponse.data,
      plants: plantsResponse.data,
      members: membersResponse.data,
    };
  } catch (error) {
    console.error('Error reading kebun data:', error);
    throw error;
  }
};

export const readPlant = async (id: string) => {
  try {
    const plantsResponse = await supabase
      .from('mykebun_plant')
      .select('*')
      .eq('id', id)
      .eq('show',true)
      .single();

    if (plantsResponse.error) {
      throw new Error('Error reading plant data');
    }

    const plantData = plantsResponse.data;
    let kebunResponse = null;

    if (plantData.kebun_id) {
      kebunResponse = await supabase
        .from('mykebun_kebun')
        .select('name')
        .eq('id', plantData.kebun_id)
        .single();

      if (kebunResponse.error) {
        throw new Error('Error reading kebun data');
      }
    }

    return {
      plant: plantData,
      kebun: kebunResponse ? kebunResponse.data : null
    };
  } catch (error) {
    console.error('Error reading plant data:', error);
    throw error;
  }
};

export const updateRecord = async <T>(tableName: string, id: string, data: T) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

export const deleteRecord = async (tableName: string, id: string) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};
