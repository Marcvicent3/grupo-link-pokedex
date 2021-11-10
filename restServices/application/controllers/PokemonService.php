<?php
defined('BASEPATH') or exit('No direct script access allowed');
require_once(APPPATH . '/libraries/REST_Controller.php');

use Restserver\libraries\REST_Controller;

class PokemonService extends REST_Controller
{
    public function __construct(){
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *");
        parent::__construct();
        $this->load->database();
    }

    public function index_get(){
        $respuesta = array(
            'error' => false,
        );
        $this->response($respuesta);
    }

    public function region_get(){
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://pokeapi.co/api/v2/pokedex/',
          CURLOPT_RETURNTRANSFER => true,
        ));
        
        $curlResponse = curl_exec($curl);
        
        curl_close($curl);

        $respuesta = array(
            'error' => false,
            'regiones' => json_decode($curlResponse)
        );
        $this->response($respuesta);
    }

    public function informacionPokemon_post(){
        $data = $this->post();

        $curl = curl_init();
        

        curl_setopt_array($curl, array(
          CURLOPT_URL => $data['url'],
          CURLOPT_RETURNTRANSFER => true,
        ));
        
        $curlResponse = curl_exec($curl);
        
        curl_close($curl);

        $respuesta = array(
            'error' => false,
            'infoPokemon' => json_decode($curlResponse)
        );
        $this->response($respuesta);
    }
    public function habilidadesPokemon_post(){
        $data = $this->post();

        $curl = curl_init();
        $url = "https://pokeapi.co/api/v2/pokemon/".$data['id']."/";
        curl_setopt_array($curl, array(
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
        ));
        
        $curlResponse = curl_exec($curl);
        
        curl_close($curl);

        $respuesta = array(
            'error' => false,
            'habilidades' => json_decode($curlResponse),
            'url' => $url
        );
        $this->response($respuesta);
    }
}
