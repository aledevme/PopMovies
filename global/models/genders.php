<?php 

class Gender extends Validator{  
    private $id;
    private $name;

    public function id($value)
    {
        if($this->validateId($value)){
            $this->id = $value;
            return true;
        }
        else{
            return false;
        }
    }
    public function name($value){
        if($this->validateAlphabetic($value, 1, 20)){
            $this->name = $value;
            return true;
        }
        else
        {
            return false;
        }
    }
    public function exist()
    {
        $sql = 'SELECT gender FROM genders WHERE gender=?';
        $params = array($this->name);
        return Database::getRow($sql, $params);
    }
    public function find(){
        $sql='SELECT id, gender FROM genders WHERE id=?';
        $params=array($this->id);
        return Database::getRow($sql, $params);
    }
    public function all()
    {
         $sql='SELECT * FROM genders';
         $params =null;
         return Database::getRows($sql, $params);
    }
    public function create()
    {
        $sql = 'INSERT INTO genders(gender) VALUES(?)';
        $params = array($this->name);
        return Database::executeRow($sql, $params);
    }
    public function delete()
    {
        $sql ='DELETE FROM genders WHERE id=?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}

?>