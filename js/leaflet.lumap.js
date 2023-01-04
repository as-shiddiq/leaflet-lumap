(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || lm, global.Lumap = factory());
}(this, (function () { 'use strict';

    function Lumap(_map,_el,_l)
    {
        let lm = this;
        let _html =``;
        let _id;
        let _elClick;
        let _layers = new Map();
        let _generated = false;
        let _layersGroup = '';

        lm.init = function()
        {
            let _i;
            _id  = lm.makeId(5);
            _html +=`<div class="accordion" id="lumap-${_id}">`;
            if(_el==null)
            {
                console.error('Selector is null')
            }

            for(_i in _l)
            {
                _html += lm.genBody(_l[_i]);
            }
            _html += `</div>`;

            _el.innerHTML = _html;

            lm.onclick();
            _generated = true;
        }

        lm.eachLayers = function(v,k,m)
        {
            if(v.group.id==_layersGroup)
            {
                _map.removeLayer(v.layer);
            }
        }

        lm.onclick = function()
        {
            if(!_generated)
            {
                let _els = _el.querySelectorAll('.lm-click-layer');
                for(_elClick of _els)
                {
                    _elClick.addEventListener('click',(e)=>{
                        let _getId = e.target.getAttribute('for')??e.target.getAttribute('id');
                        let _chckd = document.querySelector(`input[id="${_getId}"]`).checked;
                        let _getLayer = _layers.get(_getId);
                        if(_getLayer.group.type=='single')
                        {
                            _layersGroup = _getLayer.group.id;
                            _layers.forEach(lm.eachLayers);
                        }
                        if(_chckd)
                        {
                            _getLayer.layer.addTo(_map);
                        }
                        else
                        {
                            console.log(_getId)
                            _map.removeLayer(_getLayer.layer);
                        }

                    });
                }
            }
        }

        lm.genBody = function(_d)
        {
            let _h = ``;
             _h += `<div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#header-${_id}${_d.id}" aria-expanded="true" aria-controls="collapseOne">
                        ${_d.title}
                      </button>
                    </h2>
                    <div id="header-${_id}${_d.id}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#lumap-${_id}">
                      <div class="accordion-body">`;
            if(_d.type=='single')
            {
                _h += lm.genSingle(_d);
            }
            else{
                _h += lm.genMultiple(_d);
            }
            _h += `</div>
                    </div>
                  </div>`;
            return _h;
        }

        lm.genLayers = function(_setId,_l,_d)
        {
            if(!_layers.has(_setId))
            {
                _layers.set(_setId,{layer:_l,group:_d});
            }
        }

        lm.genSingle = function(_d)
        {
            let _h = ``;
            let _i;
            for(_i in _d.child)
            {
                let _setId = `${_d.id}${_i}`;
                let _c = _d.child[_i];
                lm.genLayers(_setId,_c.layer,_d);
                _h += `<div class="form-check">
                          <input class="form-check-input lm-click-layer" type="radio" name="flexRadioDefault" id="${_setId}">
                          <label class="form-check-label" for="${_setId}">
                            ${_c.title}
                          </label>
                        </div>`;
            }
            return _h;
        };

        lm.genMultiple = function(_d)
        {
            let _h = ``;
            let _i;
            for(_i in _d.child)
            {
                let _setId = `${_d.id}${_i}`;
                let _c = _d.child[_i];
                lm.genLayers(_setId,_c.layer,_d);
                _h += `<div class="form-check">
                          <input class="form-check-input lm-click-layer" type="checkbox" value="" id="${_setId}">
                          <label class="form-check-label" for="${_setId}">
                            ${_c.title}
                          </label>
                        </div>`;
            }
            return _h;
        };

        lm.makeId = function (_length){
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < _length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

       lm.init();
    };

    return Lumap;
})));